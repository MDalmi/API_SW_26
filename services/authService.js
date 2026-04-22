const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userService = require("./userService");

async function autenticar(email, password) {
  // 1. Busca usuário
  const user = await userService.findUserByEmail(email);
  if (!user) return null;

  // 2. Compara senha (bcrypt) [cite: 91, 218]
  const senhaValida = await bcrypt.compare(password, user.senha);
  if (!senhaValida) return null;

  // 3. Gera Payload e Token [cite: 219, 282]
  const payload = { 
    sub: user.id, 
    role: user.flag_perm // Usando o seu campo de permissão
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h"
  });

  return token;
}

module.exports = { autenticar };