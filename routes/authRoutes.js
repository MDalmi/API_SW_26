const { Router } = require("express");
const { login } = require("../controllers/authController");
const router = Router();

// Login do usuário 
router.post("/login", login);

module.exports = router;