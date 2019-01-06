var express = require('express');
var router = express.Router();
const encomenda_controller = require('../controllers/encomendaController');

router.get('/', encomenda_controller.findAll);
router.get('/:id', encomenda_controller.findOne);
router.get('/:id/itens', encomenda_controller.findItensByEncomendaId);
router.get('/:id/itens/:iditem', encomenda_controller.findItensByEncomendaItemId);
router.post('/', encomenda_controller.createEncomenda);
router.put('/:id', encomenda_controller.updateEncomenda);
router.delete('/:id', encomenda_controller.deleteEncomenda);
module.exports = router;