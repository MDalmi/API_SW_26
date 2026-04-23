const UserDAO = require('../dao/userDAO');
const bcrypt = require('bcrypt');

async function registrarUsuario(dados) {
    // 1. Criptografia 
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(dados.senha, salt);

    // 2. Monta o objeto para o DAO
    const novoUsuario = {
        nome: dados.nome,
        email: dados.email,
        senha: senhaHash,
        flag_perm: 'cliente'
    };

    // 3. Chama o DAO para persistir
    return await UserDAO.inserir(novoUsuario);
}

// Re-exporta a busca por email para o Controller usar no login
async function findUserByEmail(email) {
    return await UserDAO.buscarPorEmail(email);
}

module.exports = { registrarUsuario, findUserByEmail };