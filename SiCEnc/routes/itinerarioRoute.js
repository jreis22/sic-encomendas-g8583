var express = require('express');
var router = express.Router();
const itinerario_controller = require('../controllers/itinerarioController');

router.get('/', itinerario_controller.listarItinerarios);
router.get('/calcularItinerarios', itinerario_controller.calcularItinerarios);

module.exports = router;