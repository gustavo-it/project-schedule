const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController')

route.get('/formulario', homeController.formulario);
route.post('/formulario', homeController.trataForm);

module.exports = route;