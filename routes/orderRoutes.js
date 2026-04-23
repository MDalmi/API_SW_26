const { Router } = require("express");
const orderController = require("../controllers/orderController");
const { authenticateToken, authorizeRoles } = require("../middlewares/authMiddleware");
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Gerenciamento de pedidos
 */

/**
 * @swagger
 * /api/pedidos:
 *   get:
 *     summary: Lista todos os pedidos
 *     description: Retorna todos os pedidos com filtros opcionais. Acesso restrito a administradores.
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pendente, entregue, cancelado]
 *         description: Filtra pedidos pelo status
 *       - in: query
 *         name: data
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtra pedidos pela data (YYYY-MM-DD)
 *       - in: query
 *         name: cliente
 *         schema:
 *           type: string
 *         description: Filtra pedidos pelo nome ou ID do cliente
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pedido'
 *             examples:
 *               pedidosLista:
 *                 $ref: '#/components/examples/PedidoExample'
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: Acesso negado — requer perfil admin
 *   post:
 *     summary: Cria um novo pedido
 *     description: Cria um pedido vinculado ao usuário autenticado.
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PedidoInput'
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       400:
 *         description: Dados inválidos no corpo da requisição
 *       401:
 *         description: Token não fornecido ou inválido
 */
router.get("/", authenticateToken, authorizeRoles("admin"), orderController.listar);
router.post("/", authenticateToken, orderController.criar);

/**
 * @swagger
 * /api/pedidos/{id}:
 *   get:
 *     summary: Busca um pedido por ID
 *     description: Retorna os detalhes de um pedido específico. Usuários só podem ver os próprios pedidos; admins podem ver qualquer um.
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       401:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Pedido não encontrado
 *   put:
 *     summary: Atualiza o status de um pedido
 *     description: Altera o status do pedido para "entregue" ou "cancelado". Acesso restrito a administradores.
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [entregue, cancelado]
 *                 example: entregue
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       400:
 *         description: Status inválido
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: Acesso negado — requer perfil admin
 *       404:
 *         description: Pedido não encontrado
 */
router.get("/:id", authenticateToken, orderController.buscarPorId);
router.put("/:id", authenticateToken, authorizeRoles("admin"), orderController.atualizar);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Pedido:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         clienteId:
 *           type: integer
 *           example: 42
 *         status:
 *           type: string
 *           enum: [pendente, entregue, cancelado]
 *           example: pendente
 *         total:
 *           type: number
 *           format: float
 *           example: 199.90
 *         criadoEm:
 *           type: string
 *           format: date-time
 *           example: 2024-03-15T10:30:00Z
 *         itens:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ItemPedido'
 *     ItemPedido:
 *       type: object
 *       properties:
 *         produtoId:
 *           type: integer
 *           example: 7
 *         quantidade:
 *           type: integer
 *           example: 2
 *         precoUnitario:
 *           type: number
 *           format: float
 *           example: 99.95
 *     PedidoInput:
 *       type: object
 *       required:
 *         - itens
 *       properties:
 *         itens:
 *           type: array
 *           minItems: 1
 *           items:
 *             type: object
 *             required:
 *               - produtoId
 *               - quantidade
 *             properties:
 *               produtoId:
 *                 type: integer
 *                 example: 7
 *               quantidade:
 *                 type: integer
 *                 example: 2
 */