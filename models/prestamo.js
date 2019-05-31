'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var estadosValidos = {
    values: ['A', 'B'], //Iniciado, Terminado
    message: '{VALUE} no es un estado permitido'
}

var prestamoSchema = Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    cuentaEstudiante: { type: String, required: false },
    grupo: { type: Schema.ObjectId, ref: 'Grupo', required: false },
    carrera: { type: Schema.ObjectId, ref: 'Carrera', required: false },
    fechaEntrada: { type:Date, required: false },
    fechaSalida: { type:Date, required: false },
    estatus: { type:String, required: true, default: 'A', enum: estadosValidos },
});

module.exports = mongoose.model('Prestamo', prestamoSchema);