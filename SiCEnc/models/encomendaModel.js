var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var estados = require('./estadoEncomenda');

var Encomenda = new Schema({
    cliente : Number,
    itens : [{type: Schema.Types.ObjectId, ref: 'ProdutoItem'}],
    estado: {
        type: String,
        enum: estados.estadosArr()
    },
    cidadeEntrega: String,
    fabricaAtribuida: String,
    idUtilizador: Number
});

module.exports = mongoose.model('Encomenda', Encomenda);
