// services/orderService.js — Lógica de negócio do recurso orders (pedidos)

const OrderDAO = require("../orderDAO");
// =============================================
// Buscar todos os pedidos
// =============================================
async function buscarTodos() {
  return await OrderDAO.buscarTodos();
}

// =============================================
// Buscar um pedido por ID
// =============================================
async function buscarPorId(id) {
  return await OrderDAO.buscarPorId(id);
}

// =============================================
// Criar um novo pedido
// =============================================
async function criar(dados) {
  const novoPedido = {
    cliente: dados.cliente,
    itens: dados.itens,
    total: dados.total,
  };

  if (!novoPedido.cliente || !novoPedido.itens ||  novoPedido.total < 0) {
    return null;
  }

  return await OrderDAO.inserir(novoPedido);
}

// =============================================
// Atualizar um pedido existente
// =============================================
async function atualizar(id, dados) {
  const pedidoExistente = await OrderDAO.buscarPorId(id);

  if (!pedidoExistente) {
    return null;
  }

    const dadosAtualizados = {
    cliente: dados.cliente || pedidoExistente.cliente,
    itens: dados.itens || pedidoExistente.itens,
    total: dados.total !== undefined ? dados.total : pedidoExistente.total,
    };

  
    return await OrderDAO.atualizar(id, dadosAtualizados);
}

// =============================================
// Remover um pedido
// =============================================
async function remover(id) {
  const pedidoExistente = await OrderDAO.buscarPorId(id);

  if (!pedidoExistente) {
    return null;
  }

  return await OrderDAO.remover(id);
}

module.exports = {
  buscarTodos: buscarTodos,
  buscarPorId: buscarPorId,
  criar: criar,
  atualizar: atualizar,
  remover: remover,
};
