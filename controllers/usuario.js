'use strict'
//modulos
var bcrypt = require('bcryptjs');
var moment = require('moment');

//modelos
var Usuario = require('../models/usuario');

//acciones
//  ==================================================
//  Obtener todos los usuarios
//  ==================================================
function getUsers(req, res){

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Usuario.find({  }, 'nombre email role')
        .skip(desde)
        .limit(5)
        .exec( 
            (err, usuarios) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando usuario',
                    errors: err
                });
            }

            Usuario.count({}, (err, conteo)=>{
                res.status(200).json({
                    ok: true,
                    usuarios: usuarios,
                    total: conteo
                });
            });
    });    
}

//  ==================================================
//  Actualizar usuario
//  ==================================================
function updateUsuario(req, res){
    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) =>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar usuario',
                errors: err
            });
        }

        if(!usuario){
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id '+ id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = '.';

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        });

    });
}

//  ==================================================
//  Actualizar contraseña
//  ==================================================
function updateUsuarioPassword(req, res){
    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) =>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar usuario',
                errors: err
            });
        }

        if(!usuario){
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id '+ id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;
        usuario.password = bcrypt.hashSync(body.password, 10);

        usuario.save((err, usuarioGuardado) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = '.';

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        });

    });
}

//  ==================================================
//  Crear un nuevo usuario
//  ==================================================
function saveUsuario(req, res){

    // Recoger parametros peticion
    var body = req.body;

    // Crea objeto de  usuario
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    // Guardar usuario en la BD
    usuario.save((err, userStored) => {
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: userStored
        });
    });
   
}

//  ==================================================
//  Borrar un usuario
//  ==================================================
function deleteUsuario (req, res)  {
    var id = req.params.id;

    Usuario.findByIdAndDelete(id, (err, usuarioBorrado) => {
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuario',
                errors: err
            });
        }

        if(!usuarioBorrado){
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ese id',
                errors: { message: 'No existe un usuario con ese id'}
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
}
module.exports = {
    getUsers,
    saveUsuario,
    updateUsuario,
    updateUsuarioPassword,
    deleteUsuario
};