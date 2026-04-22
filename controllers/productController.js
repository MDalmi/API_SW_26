const productService = require("../services/productService");

// =============================================
// Listar todos os produtos
// =============================================
async function listar(req, res, next) {
    try {
        const produtos = await productService.buscarTodos();

        if (!produtos || produtos.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Nenhum produto encontrado.",
            });
        }

        return res.status(200).json(produtos);
    } catch (erro) {
        return next(erro);
    }
}

// =============================================
// Buscar um produto por ID
// =============================================
async function buscarPorId(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const produto = await productService.buscarPorId(id);

        if (!produto) {
            return res.status(404).json({
                sucesso: false,
                mensagem: `Produto ${id} não encontrado.`,
            });
        }

        return res.status(200).json(produto || {});
    } catch (erro) {
        return next(erro);
    }
}

// =============================================
// Criar um novo produto
// =============================================
async function criar(req, res, next) {
    try {
        const dados = req.body;

        if (dados.preco < 0 || !dados.nome || dados.estoque < 0) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Dados inválidos para criação do produto.",
            });
        }

        const novoProduto = await productService.criar(dados);
        return res.status(201).json(novoProduto);
    } catch (erro) {
        return next(erro);
    }
}

// =============================================
// Atualizar um produto 
// =============================================
async function atualizar(req, res, next) {
    try {
        const id = parseInt(req.params.id); // ID via URL params
        const dados = req.body;

        const produtoAtualizado = await productService.atualizar(id, dados);

        if (!produtoAtualizado) {
            return res.status(404).json({
                sucesso: false,
                mensagem: `Produto ${id} não encontrado.`,
            });
        }

        return res.status(200).json(produtoAtualizado);
    } catch (erro) {
        return next(erro);
    }
}
// =============================================
// Remover um produto específico 
// =============================================
async function remover(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const removido = await productService.remover(id);

        if (!removido) {
            return res.status(404).json({ mensagem: "Produto não encontrado." });
        }

        return res.status(200).json({ mensagem: "Produto removido com sucesso." });
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