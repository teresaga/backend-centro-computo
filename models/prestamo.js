'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var estadosValidos = {
    values: ['A', 'B'],
    message: '{VALUE} no es un estado permitido'
}

var prestamoSchema = Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    cuentaEstudiante: { type: String, required: false },
    grupo: { type: String, required: false },
    carrera: { type: String, required: false },
    fechaEntrada: { type:Date, required: false },
    fechaSalida: { type:Date, required: false },
    status: { type:String, required: true, default: 'A', enum: estadosValidos },
});

module.exports = mongoose.model('Prestamo', prestamoSchema);