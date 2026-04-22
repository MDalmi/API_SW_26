const { Router } = require("express");
const orderController = require("../controllers/orderController");
const { authenticateToken, authorizeRoles } = require("../middlewares/authMiddleware");
const router = Router();

// Busca todos os pedidos com filtros opcionais (status, data, cliente)
router.get("/", authenticateToken, authorizeRoles("admin"), orderController.listar);

// Busca um pedido por ID
router.get("/:id", authenticateToken, orderController.buscarPorId);

// Cria um novo pedido
router.post("/", authenticateToken,  orderController.criar);

// Altera pedido para "entrege" ou "cancelado"
router.put("/:id", authenticateToken, authorizeRoles("admin"),  orderController.atualizar);

module.exports = router;