// services/productService.js — Lógica de negócio do recurso products (produtos)

const ProdutoDAO = require("../dao/productDAO");
// =============================================
// Buscar todos os produtos 
// =============================================
async function buscarTodos() {
  return await ProdutoDAO.buscarTodos();    
}

// =============================================
// Buscar um produto por ID
// =============================================
async function buscarPorId(id) {
  return await ProdutoDAO.buscarPorId(id);
}

// =============================================
// Criar um novo produto
// =============================================
async function criar(dados) {
  const novoProduto = {
    nome: dados.nome,
    descricao: dados.descricao,
    preco: dados.preco,
    estoque: dados.estoque,
  };

  if (!novoProduto.nome || novoProduto.preco === undefined || novoProduto.estoque < 0) {
    return null;
  }

  return await ProdutoDAO.inserir(novoProduto);
}

// ===============================  ==============
// Atualizar um produto existente
// =============================================
async function atualizar(id, dados) {
  const produtoExistente = await ProdutoDAO.buscarPorId(id);

  if (!produtoExistente) {
    return null;
  }

  const dadosAtualizados = {
    nome: dados.nome || produtoExistente.nome,
    descricao: dados.descricao || produtoExistente.descricao,
    preco: dados.preco !== undefined ? dados.preco : produtoExistente.preco,
    estoque: dados.estoque !== undefined ? dados.estoque : produtoExistente.estoque,
  };

  return await ProdutoDAO.atualizar(id, dadosAtualizados);
}

// =============================================
// Remover um produto
// =============================================
async function remover(id) {
  const produtoExistente = await ProdutoDAO.buscarPorId(id);

  if (!produtoExistente) {
    return null;
  }

  return ProdutoDAO.remover(id);
}

module.exports = {
  buscarTodos: buscarTodos,
  buscarPorId: buscarPorId,
  criar: criar,
  atualizar: atualizar,
  remover: remover,
};

 