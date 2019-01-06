var mongoose = require('mongoose');
//var uniqueValidator = require ('mongoose-unique-validator');
var idvalidator = require('mongoose-id-validator');
var Schema = mongoose.Schema;

var ProdutoItem= new Schema({
    idProduto : {type : Number,required : true},
    altura : {type: Number, min: 0, required : true},
    largura : {type: Number, min: 0, required : true},
    profundidade: {type: Number, min: 0, required : true},
    idMaterial: {type : Number, required : true},
    idAcabamento: {type : Number, required : true},
    filhos:[this]
});

//ProdutoItem.plugin(uniqueValidator); 
ProdutoItem.plugin(idvalidator);

module.exports = mongoose.model('ProdutoItem', ProdutoItem);
