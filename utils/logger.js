const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');

// Criar diretório de logs se não existir
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logStream = fs.createWriteStream(
  path.join(logDir, `app-${new Date().toISOString().split('T')[0]}.log`),
  { flags: 'a' }
);

/**
 * Logger para registrar eventos da aplicação
 */
const logger = {
  /**
   * Log de informação
   * @param {String} message - Mensagem a ser logada
   * @param {Object} data - Dados adicionais
   */
  info: (message, data = null) => {
    const logMessage = `[INFO] ${new Date().toISOString()} - ${message} ${data ? JSON.stringify(data) : ''}`;
    console.log(logMessage);
    logStream.write(logMessage + '\n');
  },

  /**
   * Log de erro
   * @param {String} message - Mensagem a ser logada
   * @param {Error} error - Objeto de erro
   */
  error: (message, error = null) => {
    const errorDetails = error ? (error.stack || error.toString()) : '';
    const logMessage = `[ERROR] ${new Date().toISOString()} - ${message} ${errorDetails}`;
    console.error(logMessage);
    logStream.write(logMessage + '\n');
  },

  /**
   * Log de aviso
   * @param {String} message - Mensagem a ser logada
   * @param {Object} data - Dados adicionais
   */
  warn: (message, data = null) => {
    const logMessage = `[WARN] ${new Date().toISOString()} - ${message} ${data ? JSON.stringify(data) : ''}`;
    console.warn(logMessage);
    logStream.write(logMessage + '\n');
  }
};

module.exports = logger;