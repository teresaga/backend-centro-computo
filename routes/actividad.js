'use strict'

var express = require('express');
var ActividadController = require('../controllers/actividad');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middleware/authenticated');

api.get('/', ActividadController.getActividades);
api.post('/', md_auth.ensureAuth, ActividadController.saveActividad);
api.put('/:id', md_auth.ensureAuth, ActividadController.updateActividad);
api.delete('/:id', md_auth.ensureAuth, ActividadController.deleteActividad);

module.exports = api;