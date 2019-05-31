'use strict'

var express = require('express');
var PrestamoController = require('../controllers/prestamo');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middleware/authenticated');

api.get('/', PrestamoController.getPrestamos);
api.get('/fecha', PrestamoController.getPrestamosFecha);
api.get('/estado', PrestamoController.getPrestamosEstado);
api.post('/', md_auth.ensureAuth, PrestamoController.savePrestamo);
api.put('/:id', md_auth.ensureAuth, PrestamoController.updatePrestamo);
api.delete('/:id', md_auth.ensureAuth, PrestamoController.deletePrestamo);

module.exports = api;