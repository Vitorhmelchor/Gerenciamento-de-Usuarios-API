const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-gerado do usuário
 *         name:
 *           type: string
 *           description: Nome completo do usuário
 *         email:
 *           type: string
 *           description: Email do usuário (deve ser único)
 *         password:
 *           type: string
 *           description: Senha criptografada
 *         role:
 *           type: string
 *           enum: [admin, user]
 *           description: Papel do usuário no sistema
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação do usuário
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização
 *         lastLogin:
 *           type: string
 *           format: date-time
 *           description: Data do último login
 * 
 *     AuthResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         token:
 *           type: string
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             role:
 *               type: string
 * 
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [admin, user]
 * 
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 * 
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints de autenticação de usuários
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: integer
 *       400:
 *         description: Dados inválidos ou usuário já existe
 *       500:
 *         description: Erro no servidor
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Fazer login no sistema
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro no servidor
 */
router.post('/login', authController.login);

module.exports = router;