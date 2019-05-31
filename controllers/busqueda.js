'use strict'
//modulos
var bcrypt = require('bcryptjs');
var moment = require('moment');

//modelos
var Usuario = require('../models/usuario');
var Inventario = require('../models/inventario');
var Prestamo = require('../models/prestamo');
var Actividad = require('../models/actividad');
var Carrera = require('../models/carrera');
var Grupo = require('../models/grupo');
var Servicio = require('../models/servicio');

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
        case 'carreras':
            promesa = buscarCarreras(busqueda, regex);
            break;
        case 'grupos':
            promesa = buscarGrupos(busqueda, regex);
            break;
        case 'servicios':
            promesa = buscarServicios(busqueda, regex);
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
            .or([{ 'descripcion': regex }])
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
            .populate({path: 'carrera'})
            .populate({path: 'grupo'})
            .or([{ 'nombre': regex }, { 'cuentaEstudiante': regex } ])
            .exec((err, prestamos) => {

                if (err) {
                    reject('Error al cargar préstamos', err);
                } else {
                    resolve(prestamos)
                }
            });
    });
}

function buscarActividades(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Actividad.find({ })
            .populate({path: 'carrera'})
            .populate({path: 'servicio'})
            .populate({path: 'grupo'})
            .or([{ 'nombre': regex }, { 'cuentaEstudiante': regex }, { 'equipo': regex }, { 'marca': regex }, { 'color': regex }])
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

function buscarCarreras(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Carrera.find({ })
            .or([{ 'nombre': regex }])
            .exec((err, carrera) => {

                if (err) {
                    reject('Error al cargar carrera', err);
                } else {
                    resolve(carrera)
                }
            });
    });
}

function buscarGrupos(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Grupo.find({ })
            .or([{ 'nombre': regex }])
            .exec((err, grupo) => {

                if (err) {
                    reject('Error al cargar grupo', err);
                } else {
                    resolve(grupo)
                }
            });
    });
}

function buscarServicios(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Servicio.find({ })
            .or([{ 'nombre': regex }])
            .exec((err, servicio) => {

                if (err) {
                    reject('Error al cargar servicio', err);
                } else {
                    resolve(servicio)
                }
            });
    });
}

module.exports = {
    busquedaColeccion,
    busquedaGeneral
};