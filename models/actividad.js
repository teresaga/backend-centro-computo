'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var estadosValidos = {
    values: ['A', 'F', 'C', 'P'], //Registrada, Finalizada, Cancelada y En proceso
    message: '{VALUE} no es un estado permitido'
}

var actividadesSchema = Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    cuentaEstudiante: { type: String, required: false },
    grupo: { type: String, required: false },
    carrera: { type: String, required: false },
    tipoServicio: { type: String, required: [true, 'El tipo de servicio es necesario'] },
    equipo: { type:String, required: false },
    marca: { type:String, required: false },
    color: { type:String, required: false },
    fechaEntrada: { type:Date, required: false },
    fechaSalida: { type:Date, required: false },
    observaciones: { type:String, required: false },
    status: { type:String, required: true, default: 'A', enum: estadosValidos },
});

module.exports = mongoose.model('Actividade', actividadesSchema);