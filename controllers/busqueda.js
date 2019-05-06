'use strict'
//modulos
var bcrypt = require('bcryptjs');
var moment = require('moment');

//modelos
var Usuario = require('../models/usuario');
var Inventario = require('../models/inventario');
var Prestamo = require('../models/prestamo');
var Actividad = require('../models/actividad');

// servicio jwt
//var jwt = require('../services/jwt');

//acciones
//  ==================================================
//  Busqueda por coleccion
//  ==================================================
function busquedaColeccion(req, res){
    var busqueda = req.params.busqueda;
    var tabla = req.params.tabla;
    var regex = new RegExp(busqueda, 'i');
    var promesa;

    switch( tabla ) {
        case 'usuarios':
            promesa = buscarUsuarios(busqueda, regex);
            break;
        case 'inventario':
            promesa = buscarInventario(busqueda, regex);
            break;
        case 'prestamos':
            promesa = buscarPrestamos(busqueda, regex);
            break;
        case 'actividades':
            promesa = buscarActividades(busqueda, regex);
            break;
        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de búsqueda sólo son: usuarios, inventario, prestamos y actividades',
                error: { message: 'Tipo de tabla/colección no válido' }
            });
    }

    promesa.then( data => {
        res.status(200).json({
            ok:true,
            [tabla]: data
        });
    });
}

// ==============================
// Busqueda general
// ==============================
function busquedaGeneral(req, res) {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Promise.all([
            buscarUsuarios(busqueda, regex),
            buscarInventario(busqueda, regex),
            buscarPrestamos(busqueda, regex),
            buscarActividades(busqueda, regex),
        ])
        .then(respuestas => {

            res.status(200).json({
                ok: true,
                usuarios: respuestas[0],
                inventario: respuestas[1],
                prestamos: respuestas[2],
                actividades: respuestas[3],
            });
        })


};


function buscarInventario(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Inventario.find({ })
            .or([{ 'descripcion': regex }, { 'modelo': regex }, { 'serie': regex }, { 'localizacion': regex }, { 'personaAsignacion': regex }])
            .exec((err, inventario) => {

                if (err) {
                    reject('Error al cargar inventario', err);
                } else {
                    resolve(inventario)
                }
            });
    });
}

function buscarPrestamos(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Prestamo.find({  })
            .or([{ 'nombre': regex }, { 'cuentaEstudiante': regex }, { 'grupo': regex }, { 'carrera': regex }, { 'status': regex }])
            .exec((err, prestamo) => {

                if (err) {
                    reject('Error al cargar prestamos', err);
                } else {
                    resolve(prestamo)
                }
            });
    });
}

function buscarActividades(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Actividad.find({ })
            .or([{ 'nombre': regex }, { 'cuentaEstudiante': regex }, { 'grupo': regex }, { 'carrera': regex }, { 'equipo': regex }, { 'marca': regex }, { 'color': regex }])
            .exec((err, actividades) => {

                if (err) {
                    reject('Error al cargar actividades', err);
                } else {
                    resolve(actividades)
                }
            });
    });
}

function buscarUsuarios(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Usuario.find({}, 'nombre email role status')
            .or([{ 'nombre': regex }, { 'email': regex }])
            .exec((err, usuarios) => {

                if (err) {
                    reject('Error al cargar usuarios', err);
                } else {
                    
                    resolve(usuarios);
                }


            })


    });
}

module.exports = {
    busquedaColeccion,
    busquedaGeneral
};