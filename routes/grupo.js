'use strict'

var express = require('express');
var GrupoController = require('../controllers/grupo');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middleware/authenticated');

api.get('/', GrupoController.getGrupos);
api.get('/todo', GrupoController.getTodosGrupos);
api.post('/', md_auth.ensureAuth,GrupoController.saveGrupo);
api.delete('/:id', md_auth.ensureAuth, GrupoController.deleteGrupo);


module.exports = api;