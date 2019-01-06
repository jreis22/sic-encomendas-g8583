var mongoose = require('mongoose');
var ProdutoItem = require('../models/produtoItemModel');

exports.createProdutoItem = function(body){
    return ProdutoItem.create(body);
};

exports.saveProdutoItem = function(item){
    return item.save();
};

exports.deleteProdutoItemById = function(id) {
    return ProdutoItem.findByIdAndRemove({ _id: id });
}

exports.findProdutoItemById = function(id) {
    return ProdutoItem.findById({_id: id});
}

exports.findAll = function(){
    return ProdutoItem.find({});
};

exports.findByIdAndUpdate = function(id, body) {
    return ProdutoItem.findOneAndUpdate({_id: id}, body, {new: true, runValidators: true});
}