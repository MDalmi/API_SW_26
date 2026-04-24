const OrderDAO = require("../dao/orderDAO");
const ProductDAO = require("../dao/productDAO");

// =============================================
// Buscar todos os pedidos
// =============================================
async function buscarTodos(filtros = {}) {
  return await OrderDAO.buscarTodos(filtros);
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
  if (!dados.itens || dados.itens.length === 0) {
    throw new Error("O pedido deve conter ao menos um item.");
  }

  let total = 0;

  for (const item of dados.itens) {
    if (!item.produtoId || item.quantidade <= 0) {
      throw new Error("Item inválido: produtoId e quantidade são obrigatórios.");
    }

    const produto = await ProductDAO.buscarPorId(item.produtoId); 

    if (!produto) {
      throw new Error(`Produto ${item.produtoId} não encontrado.`);
    }

    total += produto.preco * item.quantidade;
  }

  return await OrderDAO.inserir({
    id_usuario: dados.id_usuario,
    total: parseFloat(total.toFixed(2)), 
    status: "pendente",
  });
}

// =============================================
// Atualizar status de um pedido
// =============================================
async function atualizar(id, dados) {
  const pedidoExistente = await OrderDAO.buscarPorId(id);

  if (!pedidoExistente) return null;

  const statusValidos = ["entregue", "cancelado"];
  if (!statusValidos.includes(dados.status)) {
    throw new Error(`Status inválido. Use: ${statusValidos.join(" ou ")}.`);
  }

  if (pedidoExistente.status === "entregue") {
    throw new Error("Pedidos já entregues não podem ser alterados.");
  }

  return await OrderDAO.atualizar(id, { status: dados.status });
}

// =============================================
// Remover um pedido
// =============================================
async function remover(id) {
  const pedidoExistente = await OrderDAO.buscarPorId(id);
  if (!pedidoExistente) return null;
  return await OrderDAO.remover(id);
}

module.exports = {
  buscarTodos,
  buscarPorId,
  criar,
  atualizar,
  remover,
};