'use strict'
//modulos

//modelos
var DetallePrestamo = require('../models/detalle_prestamo');

//acciones
//  ==================================================
//  Obtener todos los detallesPrestamos
//  ==================================================
function getDetallePrestamos(req, res){
    var prestamo = req.query.prestamo;

    DetallePrestamo.find({ prestamo: prestamo })
        .populate({path: 'prestamo'})
        .populate({path: 'inventario'})
        .exec( 
            (err, detallesPrestamos) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando detallesPrestamo',
                    errors: err
                });
            }

            DetallePrestamo.count({}, (err, conteo)=>{
                res.status(200).json({
                    ok: true,
                    detallesPrestamos: detallesPrestamos,
                    conteo: conteo
                });
            });
    });    
}


//  ==================================================
//  Crear un nuevo detallesPrestamo
//  ==================================================
function saveDetallePrestamo(req, res){

    // Recoger parametros peticion
    var body = req.body;
    
    // Crea objeto de  detallesPrestamo
    var detallesPrestamo = new DetallePrestamo({
        prestamo: body.prestamo,
        inventario: body.inventario
    });

    // Guardar detallesPrestamo en la BD
    detallesPrestamo.save((err, detalleStored) => {
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear detallesPrestamo',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            detallesPrestamo: detalleStored
        });
    });
   
}

module.exports = {
    getDetallePrestamos,
    saveDetallePrestamo,
};