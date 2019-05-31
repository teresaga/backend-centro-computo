'use strict'
//modulos
var bcrypt = require('bcryptjs');
var moment = require('moment');

//modelos
var Grupo = require('../models/grupo');

//acciones
//  ==================================================
//  Obtener todos los grupos paginada
//  ==================================================
function getGrupos(req, res){

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Grupo.find({  })
        .skip(desde)
        .limit(5)
        .exec( 
            (err, grupos) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando grupo',
                    errors: err
                });
            }

            Grupo.count({}, (err, conteo)=>{
                res.status(200).json({
                    ok: true,
                    grupos: grupos,
                    total: conteo
                });
            });
    });    
}

//  ==================================================
//  Obtener todos los grupos
//  ==================================================
function getTodosGrupos(req, res){

    Grupo.find({  })
        .exec( 
            (err, grupos) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando grupo',
                    errors: err
                });
            }

            Grupo.count({}, (err, conteo)=>{
                res.status(200).json({
                    ok: true,
                    grupos: grupos,
                    total: conteo
                });
            });
    });    
}


//  ==================================================
//  Crear un nuevo grupo
//  ==================================================
function saveGrupo(req, res){

    // Recoger parametros peticion
    var body = req.body;

    // Crea objeto de  grupo
    var grupo = new Grupo({
        nombre: body.nombre
    });

    // Guardar grupo en la BD
    grupo.save((err, grupoStored) => {
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear grupo',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            grupo: grupoStored
        });
    });
   
}

//  ==================================================
//  Borrar un grupo
//  ==================================================
function deleteGrupo (req, res)  {
    var id = req.params.id;

    Grupo.findByIdAndDelete(id, (err, grupoBorrado) => {
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar grupo',
                errors: err
            });
        }

        if(!grupoBorrado){
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un grupo con ese id',
                errors: { message: 'No existe un grupo con ese id'}
            });
        }

        res.status(200).json({
            ok: true,
            grupo: grupoBorrado
        });
    });
}
module.exports = {
    getGrupos,
    getTodosGrupos,
    saveGrupo,
    deleteGrupo
};