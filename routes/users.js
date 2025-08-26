const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, adminAuth } = require('../middleware/auth');

// Rotas para usuários autenticados
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);

// Rotas apenas para administradores
router.get('/', auth, adminAuth, userController.getAllUsers);
router.get('/inactive', auth, adminAuth, userController.getInactiveUsers);
router.get('/:id', auth, adminAuth, userController.getUserById);
router.put('/:id', auth, adminAuth, userController.updateUser);
router.delete('/:id', auth, adminAuth, userController.deleteUser);

module.exports = router;