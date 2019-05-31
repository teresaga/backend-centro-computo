'use strict'

var express = require('express');
var CarreraController = require('../controllers/carrera');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middleware/authenticated');

api.get('/', CarreraController.getCarreras);
api.get('/todo', CarreraController.getTodosCarreras);
api.post('/', md_auth.ensureAuth,CarreraController.saveCarrera);
api.delete('/:id', md_auth.ensureAuth, CarreraController.deleteCarrera);


module.exports = api;