const { Router } = require("express");
const productController = require("../controllers/productController");
const router = Router();

// Busca todos os produtos
router.get("/", productController.getAllProducts);

// Busca um produto por ID
router.get("/:id", productController.getProductById);

/**
 * @swagger
 * /produtos:
 * post:
 * summary: Cadastra um novo item na padaria
 * tags: [Produtos]
 * security:
 * - bearerAuth: [] # Indica que esta rota exige JWT [cite: 649, 650]
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
 * description: Produto criado com sucesso [cite: 658, 659]
 * 401:
 * description: Token ausente ou inválido [cite: 660, 661]
 * 403:
 * description: Permissão insuficiente (apenas admin) [cite: 662, 663]
 */
router.post("/", productController.createProduct);

// Alterar um produto por ID
router.put("/:id", productController.updateProduct);

// Apagar um produto por ID
router.delete("/:id", productController.deleteProduct);

module.exports = router;


