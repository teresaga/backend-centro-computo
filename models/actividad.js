'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var estadosValidos = {
    values: ['A', 'F', 'P'], //Registrada, Finalizada y En proceso
    message: '{VALUE} no es un estado permitido'
}

var actividadesSchema = Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    cuentaEstudiante: { type: String, required: false },
    grupo: { type: Schema.ObjectId, ref: 'Grupo', required: false },
    carrera: { type: Schema.ObjectId, ref: 'Carrera', required: false },
    tipoServicio: { type: Schema.ObjectId, ref: 'Servicio', required: [true, 'El tipo de servicio es necesario'] },
    equipo: { type:String, required: false },
    marca: { type:String, required: false },
    color: { type:String, required: false },
    fechaEntrada: { type:Date, required: false },
    fechaSalida: { type:Date, required: false },
    observaciones: { type:String, required: false },
    estatus: { type:String, required: true, default: 'A', enum: estadosValidos },
});

module.exports = mongoose.model('Actividade', actividadesSchema);