'use strict'
//modulos
var bcrypt = require('bcryptjs');
var moment = require('moment');

//modelos
var Prestamo = require('../models/prestamo');

// servicio jwt
//var jwt = require('../services/jwt');

//acciones
//  ==================================================
//  Obtener todos los prestamos
//  ==================================================
function getPrestamos(req, res){
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Prestamo.find({  })
        .populate({path: 'grupo'})
        .populate({path: 'carrera'})
        .skip(desde)
        .limit(5)
        .exec( 
            (err, prestamos) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando prestamo',
                    errors: err
                });
            }

            Prestamo.count({}, (err, conteo)=>{
                res.status(200).json({
                    ok: true,
                    prestamos: prestamos,
                    conteo: conteo
                });
            });
    });    
}

//  ==================================================
//  Busqueda prestamos por fecha registro
//  ==================================================
function getPrestamosFecha(req, res){
    var desde = req.query.desde || 0;
    desde = Number(desde);
    var datestart = req.query.datestart;
    var dateend = req.query.dateend;

    Prestamo.find({$and: [ { fechaEntrada: { $gte: new Date(datestart) } }, { fechaEntrada: { $lte: new Date(dateend) } } ]})
        .populate({path: 'grupo'})
        .populate({path: 'carrera'})
        .skip(desde)
        .limit(5)
        .exec( 
            (err, prestamos) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando prestamo',
                    errors: err
                });
            }

            Prestamo.count({$and: [ { fechaEntrada: { $gte: new Date(datestart) } }, { fechaEntrada: { $lte: new Date(dateend) } } ]}, (err, conteo)=>{
                res.status(200).json({
                    ok: true,
                    prestamos: prestamos,
                    conteo: conteo
                });
            });
    });    
}

//  ==================================================
//  Busqueda prestamos por fecha registro
//  ==================================================
function getPrestamosEstado(req, res){
    var estatus = req.query.estatus;

    Prestamo.find({ estatus: estatus})
        .populate({path: 'grupo'})
        .populate({path: 'carrera'})
        .exec( 
            (err, prestamos) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando prestamo',
                    errors: err
                });
            }

            Prestamo.count({ estatus: estatus }, (err, conteo)=>{
                res.status(200).json({
                    ok: true,
                    prestamos: prestamos,
                    conteo: conteo
                });
            });
    });    
}

//  ==================================================
//  Actualizar prestamo
//  ==================================================
function updatePrestamo(req, res){
    var id = req.params.id;
    var body = req.body;

    Prestamo.findById(id, (err, prestamo) =>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar prestamo',
                errors: err
            });
        }

        if(!prestamo){
            return res.status(400).json({
                ok: false,
                mensaje: 'El prestamo con el id '+ id + ' no existe',
                errors: { message: 'No existe un prestamo con ese ID' }
            });
        }

        prestamo.nombre = body.nombre;
        prestamo.cuentaEstudiante = body.cuentaEstudiante;
        prestamo.grupo = body.grupo;
        prestamo.carrera = body.carrera;
        prestamo.fechaSalida = body.fechaSalida;
        prestamo.estatus = body.estatus;

        prestamo.save((err, prestamoGuardado) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar prestamo',
                    errors: err
                });
            }

            prestamoGuardado.password = '.';

            res.status(200).json({
                ok: true,
                prestamo: prestamoGuardado
            });
        });

    });
}

//  ==================================================
//  Crear un nuevo prestamo
//  ==================================================
function savePrestamo(req, res){

    // Recoger parametros peticion
    var body = req.body;
    var date = moment({});
    
    // Crea objeto de  prestamo
    var prestamo = new Prestamo({
        nombre: body.nombre,
        cuentaEstudiante: body.cuentaEstudiante,
        grupo: body.grupo,
        carrera: body.carrera,
        fechaEntrada: moment(date).format('YYYY-MM-DD 00:00:00.000[Z]'),
        estatus: 'A'
    });

    // Guardar prestamo en la BD
    prestamo.save((err, userStored) => {
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear prestamo',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            prestamo: userStored
        });
    });
   
}

//  ==================================================
//  Borrar un prestamo
//  ==================================================
function deletePrestamo (req, res)  {
    var id = req.params.id;

    Prestamo.findByIdAndDelete(id, (err, prestamoBorrado) => {
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar prestamo',
                errors: err
            });
        }

        if(!prestamoBorrado){
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un prestamo con ese id',
                errors: { message: 'No existe un prestamo con ese id'}
            });
        }

        res.status(200).json({
            ok: true,
            prestamo: prestamoBorrado
        });
    });
}
module.exports = {
    getPrestamos,
    getPrestamosEstado,
    getPrestamosFecha,
    savePrestamo,
    updatePrestamo,
    deletePrestamo
};