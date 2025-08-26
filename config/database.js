const mysql = require('mysql2');
require('dotenv').config();
const { logger } = require('../utils');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'seu_user',
  password: process.env.DB_PASSWORD || 'Sua_senha',
  database: process.env.DB_NAME || 'user_gerenciamento'
});

connection.connect((err) => {
  if (err) {
    logger.error('Erro ao conectar ao MySQL:', err);
    process.exit(1); 
  }
  logger.info('Conectado ao MySQL');
});

// Criar tabela de usuários se não existir
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    role ENUM('admin', 'user') DEFAULT 'user',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    lastLogin TIMESTAMP NULL
  )
`;

connection.query(createUsersTable, (err) => {
  if (err) {
    logger.error('Erro ao criar tabela:', err); 
  } else {
    logger.info('Tabela de usuários verificada/criada com sucesso'); 
  }
});

module.exports = connection;