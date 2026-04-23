const { Router } = require("express");
const { authenticateToken, authorizeRoles } = require("../middlewares/authMiddleware");
const productController = require("../controllers/productController");
const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Produtos
 *     description: Gerenciamento de produtos (CRUD)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: Pão francês
 *         descricao:
 *           type: string
 *           example: Pacote com 10 unidades
 *         preco:
 *           type: number
 *           format: float
 *           example: 2.5
 *         estoque:
 *           type: integer
 *           example: 100
 *         criadoEm:
 *           type: string
 *           format: date-time
 *           example: 2024-03-15T10:30:00Z
 *     ProdutoInput:
 *       type: object
 *       required:
 *         - nome
 *         - preco
 *         - estoque
 *       properties:
 *         nome:
 *           type: string
 *           example: Pão francês
 *         descricao:
 *           type: string
 *           example: Pacote com 10 unidades
 *         preco:
 *           type: number
 *           format: float
 *           example: 2.5
 *         estoque:
 *           type: integer
 *           example: 100
 *     ProdutoUpdate:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *         descricao:
 *           type: string
 *         preco:
 *           type: number
 *           format: float
 *         estoque:
 *           type: integer
 */

/**
 * @swagger
 * /api/produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     description: Retorna uma lista paginada de produtos disponíveis.
 *     tags: [Produtos]
 *     security: []
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *             examples:
 *               produtoLista:
 *                 $ref: '#/components/examples/ProdutoExample'
 *       404:
 *         description: Nenhum produto encontrado
 *   post:
 *     summary: Cadastra um novo produto
 *     description: Cria um produto — acesso restrito a administradores.
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProdutoInput'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *             examples:
 *               produtoCriado:
 *                 $ref: '#/components/examples/ProdutoExample'
 *       400:
 *         description: Dados inválidos para criação
 *       401:
 *         description: Token não fornecido ou inválido
 */
router.get("/", productController.listar);
router.post("/", authenticateToken, authorizeRoles("admin"), productController.criar);

/**
 * @swagger
 * /api/produtos/{id}:
 *   get:
 *     summary: Busca produto por ID
 *     description: Retorna os detalhes de um produto específico.
 *     tags: [Produtos]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *             examples:
 *               produtoExemplo:
 *                 $ref: '#/components/examples/ProdutoExample'
 *       404:
 *         description: Produto não encontrado
 *   put:
 *     summary: Atualiza produto
 *     description: Atualiza os campos do produto. Acesso restrito a administradores.
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProdutoUpdate'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *             examples:
 *               produtoAtualizado:
 *                 $ref: '#/components/examples/ProdutoExample'
 *       400:
 *         description: Dados inválidos para atualização
 *       401:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Produto não encontrado
 *   delete:
 *     summary: Remove produto
 *     description: Remove um produto (acesso restrito a administradores).
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto removido com sucesso
 *       401:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Produto não encontrado
 */
router.get("/:id", productController.buscarPorId);
router.put("/:id", authenticateToken, authorizeRoles("admin"), productController.atualizar);
router.delete("/:id", authenticateToken, authorizeRoles("admin"), productController.remover);

module.exports = router;