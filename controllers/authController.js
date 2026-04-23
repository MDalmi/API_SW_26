const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { findUserByEmail, registrarUsuario } = require("../services/userService");

async function login(req, res) {
    try {
        const { email, senha } = req.body;

        // Validação de entrada
        if (!email || !senha) {
            return res.status(400).json({ error: "Email e senha são obrigatórios." });
        }

        // Busca o usuário pelo email
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({ error: "Credenciais inválidas." });
        }

        // Verificação do Hash 
        const hashDoBanco = user.senha;

        if (!hashDoBanco) {
            return res.status(500).json({ error: "Erro na estrutura do usuário no banco." });
        }

        const senhaValida = await bcrypt.compare(senha, user.senha);

        if (!senhaValida) {
            return res.status(401).json({ error: "Credenciais inválidas." });
        }

        // Gera o token JWT
        const payload = {
            sub: user.id,
            flag_perm: user.flag_perm,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "1h",
        });

        // 6. Retorna o token ao cliente
        return res.status(200).json({ token });

    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
}

async function register(req, res) {
    try {
        const usuarioCriado = await registrarUsuario(req.body);
        return res.status(201).json({ 
            message: "Usuário criado!", 
            id: usuarioCriado.id 
        });
   } catch (error) {
    console.error("Erro ao registrar:", error); 
    return res.status(500).json({ 
        error: "Erro ao registrar.",
        detalhe: error.message 
    });
}
}

module.exports = { login, register };