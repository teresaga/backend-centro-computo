'use strict'
//modulos
var bcrypt = require('bcryptjs');
var moment = require('moment');

//modelos
var Inventario = require('../models/inventario');

// servicio jwt
//var jwt = require('../services/jwt');

//acciones
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
//  Actualizar inventario
//  ==================================================
function updateInventario(req, res){
    var id = req.params.id;
    var body = req.body;

    Inventario.findById(id, (err, inventario) =>{
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

        inventario.descripcion = body.descripcion;
        inventario.modelo = body.modelo;
        inventario.serie = body.serie;
        inventario.localizacion = body.localizacion;
        inventario.personaAsignacion = body.personaAsignacion;
        inventario.registerDate = body.registerDate;
        inventario.tipo = body.tipo;

        inventario.save((err, inventarioGuardado) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar inventario',
                    errors: err
                });
            }

            inventarioGuardado.password = '.';

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

    // Crea objeto de  inventario
    var inventario = new Inventario({
        descripcion: body.descripcion,
        modelo: body.modelo,
        serie: body.serie,
        localizacion: body.localizacion,
        personaAsignacion: body.personaAsignacion,
        registerDate: body.registerDate,
        tipo: body.tipo
    });

    // Guardar inventario en la BD
    inventario.save((err, userStored) => {
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear inventario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            inventario: userStored
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
    saveInventario,
    updateInventario,
    deleteInventario
};