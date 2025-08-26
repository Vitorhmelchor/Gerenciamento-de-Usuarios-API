/**
 * Valida um endereço de email
 * @param {String} email - Email a ser validado
 * @returns {Boolean} True se o email for válido
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida a força da senha
 * @param {String} password - Senha a ser validada
 * @returns {Object} { isValid: Boolean, message: String }
 */
const validatePassword = (password) => {
  if (password.length < 6) {
    return { isValid: false, message: 'A senha deve ter pelo menos 6 caracteres' };
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: 'A senha deve conter pelo menos uma letra minúscula' };
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'A senha deve conter pelo menos uma letra maiúscula' };
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'A senha deve conter pelo menos um número' };
  }
  
  return { isValid: true, message: 'Senha válida' };
};

/**
 * Valida os dados de registro do usuário
 * @param {Object} userData - Dados do usuário
 * @returns {Object} { isValid: Boolean, errors: Array }
 */
const validateUserRegistration = (userData) => {
  const { name, email, password, role } = userData;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres');
  }

  if (!email || !isValidEmail(email)) {
    errors.push('Email inválido');
  }

  if (!password) {
    errors.push('Senha é obrigatória');
  } else {
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      errors.push(passwordValidation.message);
    }
  }

  if (role && !['admin', 'user'].includes(role)) {
    errors.push('Role deve ser "admin" ou "user"');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida os dados de atualização do usuário
 * @param {Object} userData - Dados do usuário
 * @returns {Object} { isValid: Boolean, errors: Array }
 */
const validateUserUpdate = (userData) => {
  const { name, email, role } = userData;
  const errors = [];

  if (name && name.trim().length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres');
  }

  if (email && !isValidEmail(email)) {
    errors.push('Email inválido');
  }

  if (role && !['admin', 'user'].includes(role)) {
    errors.push('Role deve ser "admin" ou "user"');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  isValidEmail,
  validatePassword,
  validateUserRegistration,
  validateUserUpdate
};