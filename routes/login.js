'use strict'

var express = require('express');
var LoginController = require('../controllers/login');

var api = express.Router();

api.post('/', LoginController.login);

module.exports = api;