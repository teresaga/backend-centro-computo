'use strict'
//modulos
var bcrypt = require('bcryptjs');
var moment = require('moment');

//modelos
var Inventario = require('../models/inventario');

//acciones
//  ==================================================
//  Obtener todos un objeto
//  ==================================================
function getInventario(req, res){
    var id =  req.params.id;

    Inventario.findById( id )
            .exec( (err, inventario) => {
                if(err){
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al buscar inventario',
                        errors: err
                    });
                }

                if(!inventario){
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El inventario con el id '+ id + ' no existe',
                        errors: { message: 'No existe un inventario con ese ID' }
                    });
                }

                res.status(200).json({
                    ok: true,
                    inventario: inventario
                });
            });
}

//  ==================================================
//  Obtener todos los inventarios
//  ==================================================
function getInventarios(req, res){
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Inventario.find({  })
        .skip(desde)
        .limit(5)
        .exec( 
            (err, inventarios) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando inventario',
                    errors: err
                });
            }

            Inventario.count({}, (err, conteo)=>{
                res.status(200).json({
                    ok: true,
                    inventarios: inventarios,
                    conteo: conteo
                });
            });
    });    
}

//  ==================================================
//  Obtener todos los inventarios disponibles para prestamos
//  ==================================================
function getTodosInventarios(req, res){

    Inventario.find({ $and: [ { estatus: 'D' }, { tipo: 'P' } ] })
        .exec( 
            (err, inventario) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando inventarios',
                    errors: err
                });
            }

            Inventario.count({ $and: [ { estatus: 'D' }, { tipo: 'P' } ]}, (err, conteo)=>{
                res.status(200).json({
                    ok: true,
                    inventario: inventario,
                    total: conteo
                });
            });
    });    
}

//  ==================================================
//  Actualizar inventario
//  ==================================================
function updateInventario(req, res){
    var id = req.params.id;
    var body = req.body;

    Inventario.findById(id, (err, inventario) =>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar inventario',
                errors: err
            });
        }

        if(!inventario){
            return res.status(400).json({
                ok: false,
                mensaje: 'El inventario con el id '+ id + ' no existe',
                errors: { message: 'No existe un inventario con ese ID' }
            });
        }

        inventario.descripcion = body.descripcion;
        inventario.modelo = body.modelo;
        inventario.serie = body.serie;
        inventario.localizacion = body.localizacion;
        inventario.personaAsignacion = body.personaAsignacion;
        inventario.tipo = body.tipo;
        inventario.estatus = body.estatus;
        inventario.observaciones = body.observaciones;

        inventario.save((err, inventarioGuardado) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar inventario',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                inventario: inventarioGuardado
            });
        });

    });
}

//  ==================================================
//  Crear un nuevo inventario
//  ==================================================
function saveInventario(req, res){

    // Recoger parametros peticion
    var body = req.body;
    var date = moment({});

    // Crea objeto de  inventario
    var inventario = new Inventario({
        descripcion: body.descripcion,
        modelo: body.modelo,
        serie: body.serie,
        localizacion: body.localizacion,
        personaAsignacion: body.personaAsignacion,
        fechaRegistro: moment(date).format('YYYY-MM-DD 00:00:00.000[Z]'),
        tipo: body.tipo,
        estatus: body.estatus,
        observaciones: body.observaciones
    });

    // Guardar inventario en la BD
    inventario.save((err, inventarioStored) => {
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear inventario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            inventario: inventarioStored
        });
    });
   
}

//  ==================================================
//  Borrar un inventario
//  ==================================================
function deleteInventario (req, res)  {
    var id = req.params.id;

    Inventario.findByIdAndDelete(id, (err, inventarioBorrado) => {
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar inventario',
                errors: err
            });
        }

        if(!inventarioBorrado){
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un inventario con ese id',
                errors: { message: 'No existe un inventario con ese id'}
            });
        }

        res.status(200).json({
            ok: true,
            inventario: inventarioBorrado
        });
    });
}
module.exports = {
    getInventarios,
    getTodosInventarios,
    getInventario,
    saveInventario,
    updateInventario,
    deleteInventario
};