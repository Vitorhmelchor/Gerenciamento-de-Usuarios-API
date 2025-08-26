const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const { swaggerUi, specs } = require('./docs/swagger');
const { logger } = require('./utils');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rotas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Rota de saúde
app.get('/health', (req, res) => {
  logger.info('Health check realizado');
  res.status(200).json({ message: 'Servidor rodando corretamente' });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  logger.error('Erro não tratado', err);
  res.status(500).json({ message: 'Algo deu errado!' });
});

// Middleware para rotas não encontradas
app.use('/*', (req, res) => {
  logger.warn('Rota não encontrada', { path: req.originalUrl });
  res.status(404).json({ message: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;