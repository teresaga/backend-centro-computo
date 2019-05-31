'use strict'
//modulos
var bcrypt = require('bcryptjs');
var moment = require('moment');

//modelos
var Servicio = require('../models/servicio');

//acciones
//  ==================================================
//  Obtener todos los servicios paginada
//  ==================================================
function getServicios(req, res){

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Servicio.find({  })
        .skip(desde)
        .limit(5)
        .exec( 
            (err, servicios) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando servicio',
                    errors: err
                });
            }

            Servicio.count({}, (err, conteo)=>{
                res.status(200).json({
                    ok: true,
                    servicios: servicios,
                    total: conteo
                });
            });
    });    
}

//  ==================================================
//  Obtener todos los servicios
//  ==================================================
function getTodosServicios(req, res){

    Servicio.find({  })
        .exec( 
            (err, servicios) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando servicio',
                    errors: err
                });
            }

            Servicio.count({}, (err, conteo)=>{
                res.status(200).json({
                    ok: true,
                    servicios: servicios,
                    total: conteo
                });
            });
    });    
}


//  ==================================================
//  Crear un nuevo servicio
//  ==================================================
function saveServicio(req, res){

    // Recoger parametros peticion
    var body = req.body;

    // Crea objeto de  servicio
    var servicio = new Servicio({
        nombre: body.nombre
    });

    // Guardar servicio en la BD
    servicio.save((err, servicioStored) => {
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear servicio',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            servicio: servicioStored
        });
    });
   
}

//  ==================================================
//  Borrar un servicio
//  ==================================================
function deleteServicio (req, res)  {
    var id = req.params.id;

    Servicio.findByIdAndDelete(id, (err, servicioBorrado) => {
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar servicio',
                errors: err
            });
        }

        if(!servicioBorrado){
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un servicio con ese id',
                errors: { message: 'No existe un servicio con ese id'}
            });
        }

        res.status(200).json({
            ok: true,
            servicio: servicioBorrado
        });
    });
}
module.exports = {
    getServicios,
    getTodosServicios,
    saveServicio,
    deleteServicio
};