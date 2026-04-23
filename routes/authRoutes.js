const { Router } = require("express");
const { login, register } = require("../controllers/authController");
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints de autenticação
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Autentica um usuário
 *     description: Valida as credenciais e retorna um token JWT para uso nas demais rotas protegidas.
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Campos obrigatórios ausentes
 *       401:
 *         description: E-mail ou senha inválidos
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Cadastra um novo usuário
 *     description: Cria uma conta com perfil "cliente" por padrão. O campo flag_perm só deve ser enviado por administradores para criar outros admins.
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       400:
 *         description: Campos obrigatórios ausentes ou inválidos
 *       409:
 *         description: E-mail já cadastrado
 */
router.post("/register", register);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - senha
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: joao@email.com
 *         senha:
 *           type: string
 *           format: password
 *           example: "senha123"
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         tipo:
 *           type: string
 *           example: Bearer
 *         expiresIn:
 *           type: string
 *           example: 24h
 *     RegisterInput:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - senha
 *       properties:
 *         nome:
 *           type: string
 *           example: João Silva
 *         email:
 *           type: string
 *           format: email
 *           example: joao@email.com
 *         senha:
 *           type: string
 *           format: password
 *           example: "senha123"
 *         flag_perm:
 *           type: string
 *           enum: [cliente, admin]
 *           default: cliente
 *           example: cliente
 *     RegisterResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 3
 *         nome:
 *           type: string
 *           example: João Silva
 *         email:
 *           type: string
 *           example: joao@email.com
 *         flag_perm:
 *           type: string
 *           example: cliente
 */