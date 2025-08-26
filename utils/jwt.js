const jwt = require('jsonwebtoken');

/**
 * Gera um token JWT para um usuário
 * @param {Object} user - Objeto do usuário
 * @returns {String} Token JWT
 */
const generateToken = (user) => {
  return jwt.sign(
    { 
      userId: user.id, 
      email: user.email,
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

/**
 * Verifica e decodifica um token JWT
 * @param {String} token - Token JWT
 * @returns {Object} Dados decodificados do token
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Token inválido');
  }
};

/**
 * Extrai o token do header Authorization
 * @param {String} authHeader - Header Authorization
 * @returns {String} Token JWT
 */
const extractTokenFromHeader = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.replace('Bearer ', '');
};

module.exports = {
  generateToken,
  verifyToken,
  extractTokenFromHeader
};