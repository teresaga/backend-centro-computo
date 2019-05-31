'use strict'
//modulos
var bcrypt = require('bcryptjs');
var moment = require('moment');

//modelos
var Carrera = require('../models/carrera');

//acciones
//  ==================================================
//  Obtener todos los carreras paginada
//  ==================================================
function getCarreras(req, res){

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Carrera.find({  })
        .skip(desde)
        .limit(5)
        .exec( 
            (err, carreras) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando carrera',
                    errors: err
                });
            }

            Carrera.count({}, (err, conteo)=>{
                res.status(200).json({
                    ok: true,
                    carreras: carreras,
                    total: conteo
                });
            });
    });    
}

//  ==================================================
//  Obtener todos los carreras
//  ==================================================
function getTodosCarreras(req, res){

    Carrera.find({  })
        .exec( 
            (err, carreras) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando carrera',
                    errors: err
                });
            }

            Carrera.count({}, (err, conteo)=>{
                res.status(200).json({
                    ok: true,
                    carreras: carreras,
                    total: conteo
                });
            });
    });    
}


//  ==================================================
//  Crear un nuevo carrera
//  ==================================================
function saveCarrera(req, res){

    // Recoger parametros peticion
    var body = req.body;

    // Crea objeto de  carrera
    var carrera = new Carrera({
        nombre: body.nombre
    });

    // Guardar carrera en la BD
    carrera.save((err, carreraStored) => {
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear carrera',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            carrera: carreraStored
        });
    });
   
}

//  ==================================================
//  Borrar un carrera
//  ==================================================
function deleteCarrera (req, res)  {
    var id = req.params.id;

    Carrera.findByIdAndDelete(id, (err, carreraBorrado) => {
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar carrera',
                errors: err
            });
        }

        if(!carreraBorrado){
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un carrera con ese id',
                errors: { message: 'No existe un carrera con ese id'}
            });
        }

        res.status(200).json({
            ok: true,
            carrera: carreraBorrado
        });
    });
}
module.exports = {
    getCarreras,
    getTodosCarreras,
    saveCarrera,
    deleteCarrera
};