const pedidoService = require("../services/orderService");

// =============================================
// Listar todos os pedidos
// =============================================
async function listar(req, res, next) {
  try {
    const pedidos = await pedidoService.buscarTodos();

    if(!pedidos || pedidos.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Nenhum pedido encontrado.",
      });
    }
    
    return res.status(200).json(pedidos);
  } catch (erro) {
    return next(erro);
  }
}

// =============================================
// Buscar um pedido por ID
// =============================================
async function buscarPorId(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const pedido = await pedidoService.buscarPorId(id);
    if(!pedido) {
      return res.status(404).json({
        sucesso: false,
        mensagem: `Pedido ${id} não encontrado.`,
      });
    }
    return res.status(200).json(pedido || {});
  } catch (erro) {
    return next(erro);
  }
}

// =============================================
// Criar um novo pedido
// =============================================

async function criar(req, res, next) {
  try {
    const dados = req.body;
    const id_usuario = req.user.sub;
    if (dados.total < 0) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Dados inválidos para criação do pedido.",
      });
    }

    const dadosCompletos = { ...dados, id_usuario: id_usuario };

    const novoPedido = await pedidoService.criar(dadosCompletos);
    return res.status(201).json(novoPedido);
  } catch (erro) {
    return next(erro);
  }
}

// =============================================
// Atualizar um pedido 
// =============================================
async function atualizar(req, res, next) {
  try {
    const id = parseInt(req.params.id); // ID via URL params
    const dados = req.body;

    const pedidoAtualizado = await pedidoService.atualizar(id, dados);

    if (!pedidoAtualizado) {
      return res.status(404).json({ 
        sucesso: false,
        mensagem: `Pedido ${id} não encontrado.`,
      });
    }

    return res.status(200).json(pedidoAtualizado);
  } catch (erro) {
    return next(erro);
  }
}
// =============================================
// Remover um pedido específico 
// =============================================
async function remover(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const removido = await pedidoService.remover(id);

    if (!removido) {
      return res.status(404).json({ mensagem: "Pedido não encontrado." });
    }

    return res.status(200).json({ mensagem: "Pedido removido com sucesso." });
  } catch (erro) {
    return next(erro);
  }
}

module.exports = {
  listar: listar,
  buscarPorId: buscarPorId,
  criar: criar,
  atualizar: atualizar,
  remover: remover,
};