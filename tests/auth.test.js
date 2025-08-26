const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const db = require('../config/database');

describe('Testes de autenticação', () => {
  beforeAll(async () => {
    // Limpar tabela de usuários antes dos testes
    await db.promise().query('DELETE FROM users');
  });

  afterAll(async () => {
    // Fechar conexão com o banco de dados
    if (db && typeof db.end === 'function') {
      await new Promise((resolve) => db.end(resolve));
    }
  });

  test('Deve registrar um novo usuário', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        name: 'João Silva',
        email: 'joao@email.com',
        password: 'Senha123!'
      });

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('userId');
  });

  test('Deve fazer login com credenciais válidas', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'joao@email.com',
        password: 'Senha123!'
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('token');
    expect(response.body.data.user.email).toBe('joao@email.com');
  });

  test('Não deve fazer login com credenciais inválidas', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'joao@email.com',
        password: 'senhaerrada'
      });

    expect(response.status).toBe(400);
  });
});