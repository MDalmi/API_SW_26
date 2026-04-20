const livroService = require("../services/livroService");


// =============================================
// Listar todos os livros
// =============================================
function listar(req, res, next) {
  try {
    const livros = livroService.buscarTodos();
    return res.status(200).json(livros);
  } catch (erro) {
    return next(erro);
  }
}

// =============================================
// Buscar um livro por ID
// =============================================
function buscarPorId(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const livro = livroService.buscarPorId(id);

    return res.status(200).json(livro || {});
  } catch (erro) {
    return next(erro);
  }
}

// =============================================
// Criar um novo livro
// =============================================
function criar(req, res, next) {
  try {
    const dados = req.body;

    if (!dados.titulo || !dados.autor || dados.preco === undefined) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Os campos 'titulo', 'autor' e 'preco' são obrigatórios",
      });
    }

    const novoLivro = livroService.criar(dados);

    return res.status(200).json(novoLivro);
  } catch (erro) {
    return next(erro);
  }
}

// =============================================
// Atualizar um livro existente
// =============================================
function atualizar(req, res, next) {
  try {
    const id = parseInt(req.body.id);
    const dados = req.body;

    const livroAtualizado = livroService.atualizar(id, dados);

    if (!livroAtualizado) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Livro com id " + id + " não encontrado para atualização",
      });
    }

    return res.status(200).json(livroAtualizado);
  } catch (erro) {
    return next(erro);
  }
}

// =============================================
// Remover um livro
// =============================================
function remover(req, res, next) {
  try {
    livroDAO.limparTudo();

    return res.status(200).json({
      mensagem: "Livros removidos com sucesso.",
    });
  } catch (erro) {
    return next(erro);
  }
}

// =============================================
// Buscar resumo de um livro
// =============================================
function buscarResumo(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const livro = livroService.buscarPorId(id);

    if (!livro) {
      return res.status(404).send("Livro não encontrado");
    }

    res.send(
      "titulo: " +
        livro.titulo +
        ", autor: " +
        livro.autor +
        ", preco: " +
        livro.preco
    );
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
  buscarResumo: buscarResumo,
};