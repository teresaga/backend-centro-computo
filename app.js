'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas
var usuario_routes = require('./routes/usuario');
var login_routes = require('./routes/login');
//var activity_routes = require('./routes/activity');

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
//app.use('/api', activity_routes);

module.exports = app;