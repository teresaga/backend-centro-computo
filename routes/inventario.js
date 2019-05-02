'use strict'

var express = require('express');
var InventarioController = require('../controllers/inventario');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middleware/authenticated');

api.get('/', InventarioController.getInventarios);
api.post('/', md_auth.ensureAuth, InventarioController.saveInventario);
api.put('/:id', md_auth.ensureAuth, InventarioController.updateInventario);
api.delete('/:id', md_auth.ensureAuth, InventarioController.deleteInventario);

module.exports = api;