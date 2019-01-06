var Encomenda = require('../models/encomendaModel');
var ProdutoItem = require('../models/produtoItemModel');
var atribuirFabricaService = require('../services/atribuirFabricaService');

exports.findAll = function (req, res, next) {
    Encomenda.find({}).then(function (itens) {
        res.send(itens);
    }).catch(next);
};

exports.findOne = function (req, res, next) {
    Encomenda.findById({ _id: req.params.id }).then(function (encomenda) {
        res.send(encomenda);
    }).catch(next);
};
exports.findItensByEncomendaId = function (req, res, next) {
    Encomenda.findById({ _id: req.params.id }).then(function (encomenda) {
        res.send(encomenda);
    }).catch(next);
};

exports.findItensByEncomendaItemId = function (req, res, next) {
    Encomenda.findById({ _id: req.params.id }).then(function (encomenda) {
        return encomenda.itens;
    }).then(function (itens) {
        /*itens.findById({_id: req.params.iditem}).then()(function (item) {
            res.send(item);
        });*/
        var auxtemp = req.params.iditem;
        var aux = itens.toString().includes(auxtemp);
        if (aux) {
            ProdutoItem.findById({ _id: req.params.iditem }).then(function (item) {
                res.send(item);
            })
        } else {
            res.status(404).send('NOT_FOUND - Não existe esse ID de Item na Encomenda');
        }
    }).catch(next);
};

exports.createEncomenda = function (req, res, next) {
    Encomenda.create(req.body).then(function (encomenda) {
        Encomenda.populate(encomenda, 'itens', function(err) {

            atribuirFabricaService.atribuirFabricaEncomenda(encomenda, function(err, updatedEncomenda) {

                if (err)
                    return res.status(400).send(new Error('Erro ao registar encomenda'));
                else
                    return res.json(updatedEncomenda);
            })
        });
    }).catch(next);
};

exports.updateEncomenda = function (req, res, next) {
        Encomenda.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}).then(function (encomenda) {
            res.send(encomenda);
        }).catch(next);
    };

exports.deleteEncomenda = function (req, res, next) {
    Encomenda.findByIdAndRemove({ _id: req.params.id }).then(function (encomenda) {
        res.send(encomenda);
    }).catch(next);
}

exports.getEstadosEncomenda = function (req, res, nex) {
    res.send(estados.estadosArr());
}