'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas
var usuario_routes = require('./routes/usuario');
var login_routes = require('./routes/login');
var inventario_routes = require('./routes/inventario');
var actividad_routes = require('./routes/actividad');
var prestamo_routes = require('./routes/prestamo');
var detalle_prestamo_routes = require('./routes/detalle_prestamo');
var busqueda_routes = require('./routes/busqueda');
var activity_routes = require('./routes/actividad');

var carrera_routes = require('./routes/carrera');
var grupo_routes = require('./routes/grupo');
var servicio_routes = require('./routes/servicio');


// middlewares de body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configurar cabeceras y cors

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Authorization, X-API-KEY, Origin, X-Request-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
	next();
});

// rutas base
app.use('/login', login_routes);
app.use('/usuario', usuario_routes);
app.use('/inventario', inventario_routes);
app.use('/prestamo', prestamo_routes);
app.use('/detalle-prestamo', detalle_prestamo_routes);
app.use('/actividad', actividad_routes);
app.use('/busqueda', busqueda_routes);
app.use('/actividad', activity_routes);

app.use('/carrera', carrera_routes);
app.use('/grupo', grupo_routes);
app.use('/servicio', servicio_routes);

module.exports = app;