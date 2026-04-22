// services/userService.js
const UsuarioDAO = require("../dao/userDAO");

async function findUserByEmail(email) {
  
  return await UsuarioDAO.buscarPorEmail(email);
}

module.exports = { findUserByEmail };