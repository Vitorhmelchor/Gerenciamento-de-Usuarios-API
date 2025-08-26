const User = require('../models/User');
const { 
  validateUserUpdate, 
  successResponse, 
  errorResponse, 
  validationErrorResponse,
  logger 
} = require('../utils');

const userController = {
  // Obter perfil do usuário atual
  async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return errorResponse(res, 'Usuário não encontrado', 404);
      }
      
      return successResponse(res, user, 'Perfil recuperado com sucesso');
    } catch (error) {
      logger.error('Erro ao buscar perfil', error);
      return errorResponse(res, 'Erro ao buscar perfil', 500);
    }
  },

  // Atualizar perfil do usuário atual
  async updateProfile(req, res) {
    try {
      const { name, email } = req.body;

      // Validar dados de entrada
      const validation = validateUserUpdate({ name, email });
      if (!validation.isValid) {
        return validationErrorResponse(res, validation.errors);
      }

      const updated = await User.update(req.user.id, { name, email });
      
      if (!updated) {
        return errorResponse(res, 'Usuário não encontrado', 404);
      }
      
      logger.info('Perfil atualizado', { userId: req.user.id });
      
      return successResponse(res, null, 'Perfil atualizado com sucesso');
    } catch (error) {
      logger.error('Erro ao atualizar perfil', error);
      return errorResponse(res, 'Erro ao atualizar perfil', 500);
    }
  },

  // Listar todos os usuários (apenas admin)
  async getAllUsers(req, res) {
    try {
      const { role, sortBy, order } = req.query;
      const filters = {};
      
      if (role) filters.role = role;
      if (sortBy) filters.sortBy = sortBy;
      if (order) filters.order = order;

      const users = await User.findAll(filters);
      
      return successResponse(res, users, 'Usuários recuperados com sucesso');
    } catch (error) {
      logger.error('Erro ao buscar usuários', error);
      return errorResponse(res, 'Erro ao buscar usuários', 500);
    }
  },

  // Obter usuário por ID (apenas admin)
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return errorResponse(res, 'Usuário não encontrado', 404);
      }
      
      return successResponse(res, user, 'Usuário recuperado com sucesso');
    } catch (error) {
      logger.error('Erro ao buscar usuário', error);
      return errorResponse(res, 'Erro ao buscar usuário', 500);
    }
  },

  // Atualizar usuário por ID (apenas admin)
  async updateUser(req, res) {
    try {
      const { name, email, role } = req.body;

      // Validar dados de entrada
      const validation = validateUserUpdate({ name, email, role });
      if (!validation.isValid) {
        return validationErrorResponse(res, validation.errors);
      }

      const updated = await User.update(req.params.id, { name, email, role });
      
      if (!updated) {
        return errorResponse(res, 'Usuário não encontrado', 404);
      }
      
      logger.info('Usuário atualizado por admin', { 
        adminId: req.user.id, 
        updatedUserId: req.params.id 
      });
      
      return successResponse(res, null, 'Usuário atualizado com sucesso');
    } catch (error) {
      logger.error('Erro ao atualizar usuário', error);
      return errorResponse(res, 'Erro ao atualizar usuário', 500);
    }
  },

  // Excluir usuário por ID (apenas admin)
  async deleteUser(req, res) {
    try {
      if (req.user.id === parseInt(req.params.id)) {
        return errorResponse(res, 'Você não pode excluir sua própria conta', 400);
      }

      const deleted = await User.delete(req.params.id);
      
      if (!deleted) {
        return errorResponse(res, 'Usuário não encontrado', 404);
      }
      
      logger.info('Usuário excluído por admin', { 
        adminId: req.user.id, 
        deletedUserId: req.params.id 
      });
      
      return successResponse(res, null, 'Usuário excluído com sucesso');
    } catch (error) {
      logger.error('Erro ao excluir usuário', error);
      return errorResponse(res, 'Erro ao excluir usuário', 500);
    }
  },

  // Listar usuários inativos
  async getInactiveUsers(req, res) {
    try {
      const inactiveUsers = await User.findInactiveUsers();
      
      logger.info('Usuários inativos consultados', { 
        adminId: req.user.id,
        count: inactiveUsers.length 
      });
      
      return successResponse(res, inactiveUsers, 'Usuários inativos recuperados com sucesso');
    } catch (error) {
      logger.error('Erro ao buscar usuários inativos', error);
      return errorResponse(res, 'Erro ao buscar usuários inativos', 500);
    }
  }
};

module.exports = userController;