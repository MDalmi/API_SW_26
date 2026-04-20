const { Router } = require("express");
const orderController = require("../controllers/orderController");
const router = Router();

// Busca todos os pedidos com filtros opcionais (status, data, cliente)
router.get("/", orderController.getAllOrders);

// Busca um pedido por ID
router.get("/:id", orderController.getOrderById);

// Cria um novo pedido
router.post("/", orderController.createOrder);

// Altera pedido para "entrege" ou "cancelado"
router.put("/:id", orderController.updateOrder);

module.exports = router;