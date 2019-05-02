'use strict'

var express = require('express');
var BusquedaController = require('../controllers/busqueda');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middleware/authenticated');

api.get('/todo/:busqueda', BusquedaController.busquedaColeccion);
api.get('/:tabla/:busqueda', BusquedaController.busquedaGeneral);

module.exports = api;