const { verifyToken, extractTokenFromHeader, errorResponse, logger } = require('../utils');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.header('Authorization'));
    
    if (!token) {
      return errorResponse(res, 'Token de acesso não fornecido', 401);
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return errorResponse(res, 'Token inválido', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error('Erro na autenticação', error);
    return errorResponse(res, 'Token inválido', 401);
  }
};

const adminAuth = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return errorResponse(res, 'Acesso negado. Requer permissão de administrador', 403);
    }
    next();
  } catch (error) {
    logger.error('Erro na verificação de admin', error);
    return errorResponse(res, 'Erro no servidor', 500);
  }
};

module.exports = { auth, adminAuth };