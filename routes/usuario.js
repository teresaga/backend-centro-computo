'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middleware/authenticated');

api.get('/', UsuarioController.getUsers);
api.post('/', UsuarioController.saveUsuario);
api.put('/:id', md_auth.ensureAuth, UsuarioController.updateUsuario);
api.put('/password/:id', md_auth.ensureAuth, UsuarioController.updateUsuarioPassword);
api.delete('/:id', md_auth.ensureAuth, UsuarioController.deleteUsuario);


module.exports = api;