'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var estadosValidos = {
    values: ['D', 'ND', 'E', 'O'], //Disponible, no disponible (ocupado por alguien), extraviado, Ocupado por prestamo
    message: '{VALUE} no es un estado permitido'
}

var tiposValidos = {
    values: ['A', 'P', 'O'], //Asignado a personal, para Prestamos, (Otros) existe pero no es para prestamos y tampoco esta asignado. Otros no puede estar disponible
    message: '{VALUE} no es un estado permitido'
}

var inventarioSchema = Schema({
    descripcion: { type: String, required: [true, 'La descripción es necesario'] },
    modelo: { type: String, required: false },
    serie: { type: String, required: false },
    localizacion: { type: String, required: false },
    personaAsignacion: { type: String, required: false },
    fechaRegistro: { type:Date, required: false },
    tipo: { type:String, required: true, default: 'P', enum: tiposValidos },
    estatus: { type:String, required: true, default: 'D', enum: estadosValidos },
    observaciones: { type: String, required: false },
});

module.exports = mongoose.model('Inventario', inventarioSchema);