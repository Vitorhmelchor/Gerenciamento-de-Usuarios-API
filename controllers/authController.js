const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { 
  generateToken, 
  validateUserRegistration, 
  successResponse, 
  errorResponse, 
  validationErrorResponse,
  logger 
} = require('../utils');

const authController = {
  // Registrar novo usuário
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      // Validar dados de entrada
      const validation = validateUserRegistration({ name, email, password, role });
      if (!validation.isValid) {
        return validationErrorResponse(res, validation.errors);
      }

      // Verificar se o usuário já existe
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return errorResponse(res, 'Usuário já existe com este email', 400);
      }

      // Criar usuário
      const userId = await User.create({ name, email, password, role });
      
      logger.info('Novo usuário registrado', { userId, email });
      
      return successResponse(
        res, 
        { userId }, 
        'Usuário criado com sucesso', 
        201
      );
    } catch (error) {
      logger.error('Erro ao criar usuário', error);
      return errorResponse(res, 'Erro interno do servidor ao criar usuário', 500);
    }
  },

  // Login de usuário
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Verificar se o usuário existe
      const user = await User.findByEmail(email);
      if (!user) {
        return errorResponse(res, 'Credenciais inválidas', 400);
      }

      // Verificar senha
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return errorResponse(res, 'Credenciais inválidas', 400);
      }

      // Atualizar último login
      await User.updateLastLogin(user.id);

      // Gerar token JWT
      const token = generateToken(user);

      logger.info('Login realizado com sucesso', { userId: user.id, email });

      return successResponse(res, {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }, 'Login realizado com sucesso');
    } catch (error) {
      logger.error('Erro no login', error);
      return errorResponse(res, 'Erro interno do servidor no login', 500);
    }
  }
};

module.exports = authController;