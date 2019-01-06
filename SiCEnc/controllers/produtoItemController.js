var mongoose = require('mongoose');
var ProdutoItem = require('../models/produtoItemModel');
var ProdRep = require('../repositories/produtoItemRepository');
var ProdServ = require('../services/produtoItemService');
const Promise = require('bluebird');
var validacoes = [ProdServ.itemValidator, 
    ProdServ.filhosValidator,
    ProdServ.validarFilhosObrigatorios];

var validacoesUpdate = [ProdServ.itemValidator, 
        ProdServ.filhosValidator,
        ProdServ.validarFilhosObrigatoriosUpdate]

exports.findAll = function(req, res, next){
    ProdRep.findAll().then(function(items){
        res.send(items);
    });
};
/*
exports.createItem = function(req, res, next){
    var item = ProdServ.createModelFromBody(req.body);

    ProdutoItem.populate(item, 'filhos', function(err){
        /*ProdServ.itemValidator(item)
        .then(ProdServ.filhosValidator(item))
        //.then(ProdServ.validarFilhosObrigatorios(item))*
        Promise.each(validacoes, function(validacao){
            return validacao(item);
        })
        .then(ProdRep.createProdutoItem(req.body).then(function(itemP){
            console.log(itemP);
            res.send(itemP);           
        }).catch(next))
        .catch(next);
            
    });
};*/
exports.createItem = function(req, res, next){
    var item = ProdServ.createModelFromBody(req.body);

    ProdutoItem.populate(item, 'filhos', function(err){
        /*ProdServ.itemValidator(item)
        .then(ProdServ.filhosValidator(item))
        //.then(ProdServ.validarFilhosObrigatorios(item))*/
        Promise.each(validacoes, function(validacao){
            return validacao(item, req, res, next);
        }).catch(function(err){
            return res.status(400).send(err.message);
        })
            
    });
};

exports.deleteProdutoItem = function(req, res, next){
    ProdRep.deleteProdutoItemById(req.params.id).then(function(item){
        if(item == null) throw new Error("Produto nao existe");
        res.json(item);
    }).catch(next);
}

exports.findbyId = function(req, res, next) {
    ProdRep.findProdutoItemById(req.params.id).then(function(item){
        if(item == null) throw new Error("Produto nao existe");
        res.json(item);
    }).catch(next);
}

exports.updateProdutoItem = function (req, res, next) {

    var item = req.body;

    ProdutoItem.populate(item, 'filhos', function(err){
        Promise.each(validacoesUpdate, function(validacao){
            return validacao(item, req, res, next);
        }).catch(next);
    });
}
