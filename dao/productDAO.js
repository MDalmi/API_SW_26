const { Produto } = require('../models/index'); 

class ProductDAO {

  async buscarTodos() {
    return await Produto.findAll();
  }

  async buscarPorId(id) {
    return await Produto.findByPk(id);
  }

  async inserir(dadosProduto) {
    return await Produto.create({
      nome: dadosProduto.nome,
      preco: dadosProduto.preco,
      descricao: dadosProduto.descricao,
      estoque: dadosProduto.estoque,
    });
  }

  async atualizar(id, dadosAtualizados) {
    const produto = await Produto.findByPk(id);
    if (!produto) return null;
    await produto.update(dadosAtualizados);
    return produto;
  }

  async remover(id) {
    const produto = await Produto.findByPk(id);
    if (!produto) return null;
    await produto.destroy();
    return produto;
  }
}

module.exports = new ProductDAO();