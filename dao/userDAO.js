const User = require('../models/user'); // Seu modelo Sequelize
// =============================================
// Operações de Acesso a Dados
// =============================================
class UserDAO {

    async buscarTodos() {
    return await User.findAll();
    }

    async buscarPorId(id) {
        return await User.findByPk(id);
    }

    async inserir(dadosUser) {
        return await User.create({
                nome: dadosUser.nome,
                email: dadosUser.email,
                senha: dadosUser.senha
            });
    }

    async atualizar(id, dadosAtualizados) {
        const user = await User.findByPk(id);
        await user.update(dadosAtualizados);
        return await user;
    }

    async remover(id) {
        const user = await User.findByPk(id);
        await user.destroy();
        return user;
    }

}

module.exports = new UserDAO();