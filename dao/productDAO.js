const Product = require('../models/product'); // Seu modelo Sequelize
// =============================================
// Operações de Acesso a Dados
// =============================================
class ProductDAO {

    async buscarTodos() {
    return await Product.findAll();
    }

    async buscarPorId(id) {
        return await Product.findByPk(id);
    }

    async inserir(dadosProduct) {
        return await Product.create({
                nome: dadosProduct.nome,
                preco: dadosProduct.preco,
                descricao: dadosProduct.descricao,
                estoque: dadosProduct.estoque
            });
    }

    async atualizar(id, dadosAtualizados) {
        const product = await Product.findByPk(id);
        await product.update(dadosAtualizados);
        return await product;
    }

    async remover(id) {
        const product = await Product.findByPk(id);
        await product.destroy();
        return product;
    }

}

module.exports = new ProductDAO();