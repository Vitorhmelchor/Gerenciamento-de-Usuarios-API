/**
 * Formata uma resposta de sucesso
 * @param {Object} res - Objeto response do Express
 * @param {*} data - Dados a serem retornados
 * @param {String} message - Mensagem de sucesso
 * @param {Number} statusCode - Código HTTP
 * @returns {Object} Response formatada
 */
const successResponse = (res, data = null, message = 'Operação realizada com sucesso', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

/**
 * Formata uma resposta de erro
 * @param {Object} res - Objeto response do Express
 * @param {String} message - Mensagem de erro
 * @param {Number} statusCode - Código HTTP
 * @param {Array} errors - Lista de erros detalhados
 * @returns {Object} Response formatada
 */
const errorResponse = (res, message = 'Erro interno do servidor', statusCode = 500, errors = []) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors: errors.length > 0 ? errors : undefined
  });
};

/**
 * Formata uma resposta de validação com erro
 * @param {Object} res - Objeto response do Express
 * @param {Array} validationErrors - Erros de validação
 * @returns {Object} Response formatada
 */
const validationErrorResponse = (res, validationErrors) => {
  return errorResponse(
    res,
    'Dados de entrada inválidos',
    400,
    validationErrors
  );
};

module.exports = {
  successResponse,
  errorResponse,
  validationErrorResponse
};