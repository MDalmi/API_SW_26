const { Router } = require("express");
const { authenticateToken, authorizeRoles } = require("../middlewares/authMiddleware");
const productController = require("../controllers/productController");
const router = Router();

// Busca todos os produtos
router.get("/", productController.listar);

// Busca um produto por ID
router.get("/:id", productController.buscarPorId);

/**
 * @swagger
 * /produtos:
 * post:
 * summary: Cadastra um novo item na padaria
 * tags: [Produtos]
 * security:
 * - bearerAuth: [] # Indica que esta rota exige JWT 
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * nome: { type: string }
 * preco: { type: number }
 * responses:
 * 201:
 * description: Produto criado com sucesso 
 * 401:
 * description: Token ausente ou inválido]
 * 403:
 * description: Permissão insuficiente (apenas admin)
 */
router.post("/", authenticateToken, authorizeRoles("admin"), productController.criar);

// Alterar um produto por ID
router.put("/:id", authenticateToken, authorizeRoles("admin"), productController.atualizar);

// Apagar um produto por ID
router.delete("/:id", authenticateToken, authorizeRoles("admin"), productController.remover);

module.exports = router;




module.exports = router;
