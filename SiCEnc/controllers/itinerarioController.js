var Itinerario = require('../models/itinerarioModel');
var calcularItinerariosService = require('../services/calcularItinerariosService');

exports.calcularItinerarios = function(req, res) {

    calcularItinerariosService.calcularItinerarios();

    return res.send('Itinerários calculados');
};

exports.listarItinerarios = function(req, res) {

    Itinerario.find({}).then(itinerarios => {
        res.json(itinerarios);
    }).catch(err => {
        res.status(400).send(err);
    })
};