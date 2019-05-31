'use strict'
//modulos
var moment = require('moment');

//modelos
var Actividad = require('../models/actividad');

// servicio jwt
//var jwt = require('../services/jwt');

//acciones
//  ==================================================
//  Obtener todos los actividades
//  ==================================================
function getActividades(req, res){
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Actividad.find({  })
        .populate({path: 'grupo'})
        .populate({path: 'carrera'})
        .populate({path: 'tipoServicio'})
        .skip(desde)
        .limit(5)
        .exec( 
            (err, actividades) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando actividad',
                    errors: err
                });
            }

            Actividad.count({}, (err, conteo)=>{
                res.status(200).json({
                    ok: true,
                    actividades: actividades,
                    conteo: conteo
                });
            });
    });    
}

//  ==================================================
//  Obtener todos los actividades por fecha de registro
//  ==================================================
function getActividadesFechas(req, res){
    var desde = req.query.desde || 0;
    desde = Number(desde);
    var tipo = req.query.tipo || 0;
    var servicio = req.query.servicio;
    var estatus = req.query.estatus;
    var datestart = req.query.datestart;
    var dateend = req.query.dateend;

    if (tipo == 0){
        Actividad.find({$and: [ { fechaEntrada: { $gte: new Date(datestart) } }, { fechaEntrada: { $lte: new Date(dateend) } } ]}  )
            .populate({path: 'grupo'})
            .populate({path: 'carrera'})
            .populate({path: 'tipoServicio'})
            .skip(desde)
            .limit(5)
            .exec( 
                (err, actividades) => {
                if(err){
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando actividad',
                        errors: err
                    });
                }

                Actividad.count({$and: [ { fechaEntrada: { $gte: new Date(datestart) } }, { fechaEntrada: { $lte: new Date(dateend) } } ]}, (err, conteo)=>{
                    res.status(200).json({
                        ok: true,
                        actividades: actividades,
                        conteo: conteo
                    });
                });
        });    
    }else if (tipo==1){
        Actividad.find({tipoServicio: servicio ,$and: [ { fechaEntrada: { $gte: new Date(datestart) } }, { fechaEntrada: { $lte: new Date(dateend) } } ]}  )
            .populate({path: 'grupo'})
            .populate({path: 'carrera'})
            .populate({path: 'tipoServicio'})
            .skip(desde)
            .limit(5)
            .exec( 
                (err, actividades) => {
                if(err){
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando actividad',
                        errors: err
                    });
                }

                Actividad.count({tipoServicio: servicio, $and: [ { fechaEntrada: { $gte: new Date(datestart) } }, { fechaEntrada: { $lte: new Date(dateend) } } ]}, (err, conteo)=>{
                    res.status(200).json({
                        ok: true,
                        actividades: actividades,
                        conteo: conteo
                    });
                });
        });
    }else if (tipo==2){
        Actividad.find({estatus: estatus ,$and: [ { fechaEntrada: { $gte: new Date(datestart) } }, { fechaEntrada: { $lte: new Date(dateend) } } ]}  )
            .populate({path: 'grupo'})
            .populate({path: 'carrera'})
            .populate({path: 'tipoServicio'})
            .skip(desde)
            .limit(5)
            .exec( 
                (err, actividades) => {
                if(err){
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando actividad',
                        errors: err
                    });
                }

                Actividad.count({estatus: estatus ,$and: [ { fechaEntrada: { $gte: new Date(datestart) } }, { fechaEntrada: { $lte: new Date(dateend) } } ]}, (err, conteo)=>{
                    res.status(200).json({
                        ok: true,
                        actividades: actividades,
                        conteo: conteo
                    });
                });
        });
    }else if (tipo==3){
        Actividad.find({tipoServicio: servicio,estatus: estatus ,$and: [ { fechaEntrada: { $gte: new Date(datestart) } }, { fechaEntrada: { $lte: new Date(dateend) } } ]}  )
            .populate({path: 'grupo'})
            .populate({path: 'carrera'})
            .populate({path: 'tipoServicio'})
            .skip(desde)
            .limit(5)
            .exec( 
                (err, actividades) => {
                if(err){
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando actividad',
                        errors: err
                    });
                }

                Actividad.count({tipoServicio: servicio, estatus: estatus ,$and: [ { fechaEntrada: { $gte: new Date(datestart) } }, { fechaEntrada: { $lte: new Date(dateend) } } ]}, (err, conteo)=>{
                    res.status(200).json({
                        ok: true,
                        actividades: actividades,
                        conteo: conteo
                    });
                });
        });
    }
}

//  ==================================================
//  Actualizar actividad
//  ==================================================
function updateActividad(req, res){
    var id = req.params.id;
    var body = req.body;

    Actividad.findById(id, (err, actividad) =>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar actividad',
                errors: err
            });
        }

        if(!actividad){
            return res.status(400).json({
                ok: false,
                mensaje: 'El actividad con el id '+ id + ' no existe',
                errors: { message: 'No existe un actividad con ese ID' }
            });
        }

        actividad.nombre = body.nombre;
        actividad.cuentaEstudiante = body.cuentaEstudiante;
        actividad.grupo = body.grupo;
        actividad.carrera = body.carrera;
        actividad.tipoServicio = body.tipoServicio;
        actividad.equipo = body.equipo;
        actividad.marca = body.marca;
        actividad.color = body.color;
        actividad.fechaSalida = body.fechaSalida;
        actividad.observaciones = body.observaciones;
        actividad.estatus = body.estatus;

        actividad.save((err, actividadGuardado) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar actividad',
                    errors: err
                });
            }

            actividadGuardado.password = '.';

            res.status(200).json({
                ok: true,
                actividad: actividadGuardado
            });
        });

    });
}

//  ==================================================
//  Crear un nuevo actividad
//  ==================================================
function saveActividad(req, res){

    // Recoger parametros peticion
    var body = req.body;
    var date = moment({});

    // Crea objeto de  actividad
    var actividad = new Actividad({
        nombre: body.nombre,
        cuentaEstudiante: body.cuentaEstudiante,
        grupo: body.grupo,
        carrera: body.carrera,
        tipoServicio: body.tipoServicio,
        equipo: body.equipo,
        marca: body.marca,
        color: body.color,
        fechaEntrada: moment(date).format('YYYY-MM-DD 00:00:00.000[Z]'),
        estatus: 'A'
    });

    // Guardar actividad en la BD
    actividad.save((err, userStored) => {
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear actividad',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            actividad: userStored
        });
    });
   
}

//  ==================================================
//  Borrar un actividad
//  ==================================================
function deleteActividad (req, res)  {
    var id = req.params.id;

    Actividad.findByIdAndDelete(id, (err, actividadBorrado) => {
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar actividad',
                errors: err
            });
        }

        if(!actividadBorrado){
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un actividad con ese id',
                errors: { message: 'No existe un actividad con ese id'}
            });
        }

        res.status(200).json({
            ok: true,
            actividad: actividadBorrado
        });
    });
}
module.exports = {
    getActividades,
    getActividadesFechas,
    saveActividad,
    updateActividad,
    deleteActividad
};