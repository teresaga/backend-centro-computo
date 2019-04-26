'use strict'

var jwt = require('jsonwebtoken');
var secret = 'centro-computo-sistema';

exports.ensureAuth = function(req, res, next){
    var token = req.query.token;

    jwt.verify(token, secret, (err, decoded) =>{
        if(err){
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }

        req.usuario = decoded.usuario;
        
        next();
        // res.status(200).json({
        //     ok: false,
        //     decoded: decoded
        // });
    });

}