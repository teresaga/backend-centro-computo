'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var detallePrestamoSchema = Schema({
    inventario: { type: Schema.ObjectId, ref: 'Inventario', required: [true, 'El Inventario es necesario']  },
    prestamo: { type: Schema.ObjectId, ref: 'Prestamo', required: [true, 'El préstamo es necesario']  },
});

module.exports = mongoose.model('DetallePrestamo', detallePrestamoSchema);