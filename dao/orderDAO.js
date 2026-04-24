const { Pedido, Produto } = require('../models/index'); // ← era require('../models/order')

class OrderDAO {

  async buscarTodos(filtros = {}) {
    const where = {};

    if (filtros.status) {
      where.status = filtros.status;
    }

    if (filtros.data) {
      const inicio = new Date(filtros.data);
      const fim = new Date(filtros.data);
      fim.setHours(23, 59, 59, 999);
      where.data_pedido = { [Op.between]: [inicio, fim] };
    }

    if (filtros.cliente) {
      where.id_usuario = filtros.cliente;
    }

    return await Pedido.findAll({ where });
  }


  async buscarPorId(id) {
    return await Pedido.findByPk(id);
  }

  async inserir(dadosOrder) {
    return await Pedido.create({
      id_usuario: dadosOrder.id_usuario,
      total: dadosOrder.total,
      status: 'pendente',
    });
  }

  async atualizar(id, dadosAtualizados) {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) return null;
    await pedido.update(dadosAtualizados);
    return pedido;
  }

  async remover(id) {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) return null;
    await pedido.destroy();
    return pedido;
  }
}

module.exports = new OrderDAO();