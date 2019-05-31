'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
//mongodb://localhost:27017/vet_animal
//mongodb://teresagalaviz:teresa1997@ds051665.mlab.com:51665/vet_animal
//mongodb://teresagalaviz:teresa1997@ds363996.mlab.com:63996/centro_computo
//mongodb://<dbuser>:<dbpassword>@ds363996.mlab.com:63996/centro_computo
mongoose.connect('mongodb://teresagalaviz:teresa1997@ds363996.mlab.com:63996/centro_computo')
	.then(() => {
		console.log("La conexión a la base de datos centro de computo se ha realizado correctamente..");
		
		//Creacion del servidor
		app.listen( port, () => {
			console.log("El servidor local con Node y Express esta corriendo correctamente...")
		});
	})
	.catch(err => console.log(err));
