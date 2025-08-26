const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  // Criar usuário
  static async create(userData) {
    const { name, email, password, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
      db.query(query, [name, email, hashedPassword, role || 'user'], (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      });
    });
  }

  // Encontrar usuário por email
  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE email = ?';
      db.query(query, [email], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  // Encontrar usuário por ID
  static findById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id, name, email, role, createdAt, updatedAt, lastLogin FROM users WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  // Listar todos os usuários (com filtros e ordenação)
  static findAll(filters = {}) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT id, name, email, role, createdAt, updatedAt, lastLogin FROM users WHERE 1=1';
      const params = [];

      if (filters.role) {
        query += ' AND role = ?';
        params.push(filters.role);
      }

      if (filters.sortBy) {
        const order = filters.order === 'desc' ? 'DESC' : 'ASC';
        query += ` ORDER BY ${filters.sortBy} ${order}`;
      }

      db.query(query, params, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  // Atualizar usuário
  static update(id, userData) {
    return new Promise((resolve, reject) => {
      const { name, email, role } = userData;
      const query = 'UPDATE users SET name = ?, email = ?, role = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?';
      db.query(query, [name, email, role, id], (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows > 0);
      });
    });
  }

  // Excluir usuário
  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM users WHERE id = ?';
      db.query(query, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows > 0);
      });
    });
  }

  // Atualizar último login
  static updateLastLogin(id) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE users SET lastLogin = CURRENT_TIMESTAMP WHERE id = ?';
      db.query(query, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows > 0);
      });
    });
  }

  // Buscar usuários inativos (sem login nos últimos 30 dias)
  static findInactiveUsers() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT id, name, email, role, createdAt, updatedAt, lastLogin 
        FROM users 
        WHERE lastLogin < DATE_SUB(NOW(), INTERVAL 30 DAY) 
        OR lastLogin IS NULL
      `;
      db.query(query, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }
}

module.exports = User;