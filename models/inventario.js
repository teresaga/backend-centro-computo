'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var estadosValidos = {
    values: ['D', 'ND', 'A', 'NA'], //Disponible, no disponible (ocupado por alguien), asignado a personal, existe pero no es para prestamos
    message: '{VALUE} no es un estado permitido'
}

var inventarioSchema = Schema({
    descripcion: { type: String, required: [true, 'La descripción es necesario'] },
    modelo: { type: String, required: [true, 'El modelo es necesario'] },
    serie: { type: String, required: [true, 'La serie es necesaria'] },
    localizacion: { type: String, required: [true, 'La localización es necesaria'] },
    personaAsignacion: { type: String, required: false },
    fechaRegistro: { type:Date, required: false },
    tipo: { type:String, required: true, default: 'D', enum: estadosValidos },
});

module.exports = mongoose.model('Inventario', inventarioSchema);