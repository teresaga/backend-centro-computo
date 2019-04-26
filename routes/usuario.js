'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middleware/authenticated');

api.get('/', UsuarioController.getUsers);
api.post('/', md_auth.ensureAuth, UsuarioController.saveUsuario);
api.put('/:id', md_auth.ensureAuth, UsuarioController.updateUsuario);
api.delete('/:id', md_auth.ensureAuth, UsuarioController.deleteUsuario);
// api.post('/register', [md_auth.ensureAuth, md_admin.isAdmin], UserController.saveUser);
// api.put('/update-user/:id', [md_auth.ensureAuth, md_admin.isAdmin], UserController.updateUser);
// api.put('/update-user-password/:id', md_auth.ensureAuth, UserController.updateUserPassword);
// api.post('/login', UserController.login);
// api.put('/deactivate-user/:id', [md_auth.ensureAuth, md_admin.isAdmin], UserController.deactivateUser);
// api.put('/activate-user/:id', [md_auth.ensureAuth, md_admin.isAdmin], UserController.activateUser);
// api.get('/users-count', UserController.getUserCount);
// api.get('/users/:id', md_auth.ensureAuth ,UserController.getUsers);


module.exports = api;