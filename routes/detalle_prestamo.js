'use strict'

var express = require('express');
var DetallePrestamoController = require('../controllers/detalle_prestamo');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middleware/authenticated');

api.get('/', DetallePrestamoController.getDetallePrestamos);
api.post('/', md_auth.ensureAuth, DetallePrestamoController.saveDetallePrestamo);

module.exports = api;