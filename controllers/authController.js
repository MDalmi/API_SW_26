const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { findUserByEmail } = require("../services/userService");

async function login(req, res) {

    try {
        const { email, password } = req.body;
        // 1. Validação de entrada
        if (!email || !password) {
            return res.status(400).json({
                error: "Email e senha são obrigatórios.",
            });
        }
        // 2. Busca o usuário pelo email
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                error: "Credenciais inválidas.",
            });
        }
        // 3. Compara a senha com o hash armazenado
        const senhaValida = await bcrypt.compare(password, user.password);
        if (!senhaValida) {
            return res.status(401).json({
                error: "Credenciais inválidas.",
            });
        }
        // 4. Gera o token JWT
        const payload = {
            sub: user.id,
            role: user.role,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "1h",
        });
        // 5. Retorna o token ao cliente
        return res.status(200).json({ token });
    } catch (error) {

        console.error("Erro no login:", error);
        return res.status(500).json({
            error: "Erro interno do servidor.",
        });

    }

}

module.exports = { login };