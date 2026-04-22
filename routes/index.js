const { Router } = require("express");
const router = Router();

// Importação das rotas individuais
const produtoRoutes = require("./prodRouter");
const pedidoRoutes = require("./orderRoutes");
const authRoutes = require("./authRoutes");

// Definição dos prefixos
router.use("/produtos", produtoRoutes);
router.use("/pedidos", pedidoRoutes);
router.use("/auth", authRoutes);

module.exports = router;