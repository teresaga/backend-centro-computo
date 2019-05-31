'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var grupoSchema = Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] }
});

module.exports = mongoose.model('Grupo', grupoSchema);