var Client = require('node-rest-client').Client;
var client = new Client();
var Config = require('../config');
var Encomenda = require('../models/encomendaModel');

const ASSIGNADA = 'Assignada';

exports.atribuirFabricaEncomenda = function(encomenda, callback) {

    let url = Config.sicEntregasUrl + 'atribuir_fabrica';

    let args = {
        data: { cidade: encomenda.cidadeEntrega },
        headers: { 'Content-Type': 'application/json' }
    };

    client.post(url, args, function(data, response) {

        if (response.statusCode != 200)
            callback(new Error('Erro ao atribuir fábrica a encomenda'));

        encomenda.fabricaAtribuida = data;
        encomenda.estado = ASSIGNADA;

        encomenda.save(function(err, updatedEncomenda) {
            
            if (err)
                callback(err);
            else
                callback(null, updatedEncomenda);
        });
    });
}