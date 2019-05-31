'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var carreraSchema = Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] }
});

module.exports = mongoose.model('Carrera', carreraSchema);