var express = require('express');
var router = express.Router();
//var mongoose = require('mongoose');
const product_controller = require('../controllers/produtoItemController');

router.get('/', product_controller.findAll);
router.post('/', product_controller.createItem);
router.delete('/:id', product_controller.deleteProdutoItem);
router.get('/:id', product_controller.findbyId);
router.put('/:id', product_controller.updateProdutoItem);
module.exports = router;