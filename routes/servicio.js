'use strict'

var express = require('express');
var ServicioController = require('../controllers/servicio');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middleware/authenticated');

api.get('/', ServicioController.getServicios);
api.get('/todo', ServicioController.getTodosServicios);
api.post('/', md_auth.ensureAuth,ServicioController.saveServicio);
api.delete('/:id', md_auth.ensureAuth, ServicioController.deleteServicio);


module.exports = api;