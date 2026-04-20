const Order = require('../models/Pedido'); // Seu modelo Sequelize
// =============================================
// Operações de Acesso a Dados
// =============================================

class OrderDAO {

    async buscarTodos() {
    return await Order.findAll();
    }


    async buscarPorId(id) {
     return await Order.findByPk(id);
    }

    async inserir(dadosOrder) {
    return await Order.create({
            id_usuario: dadosOrder.id_usuario,
            total: dadosOrder.total,
            status: 'pendente'
        });
    }

    async atualizar(id, dadosAtualizados) {
        const order = await Order.findByPk(id);
        await order.update(dadosAtualizados);
        return await order;
    }

        async remover(id) {
        const order = await Order.findByPk(id);
        await order.destroy();
        return order;
    }

}

module.exports = new OrderDAO();