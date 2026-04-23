const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userService = require("./userService");

async function autenticar(email, password) {
  // Busca usuário
  const user = await userService.findUserByEmail(email);
  if (!user) return null;

  // Compara senha (bcrypt) 
  const senhaValida = await bcrypt.compare(password, user.senha);
  if (!senhaValida) return null;

  // Gera Payload e Token
  const payload = { 
    sub: user.id, 
    role: user.flag_perm 
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h"
  });

  return token;
}

module.exports = { autenticar };