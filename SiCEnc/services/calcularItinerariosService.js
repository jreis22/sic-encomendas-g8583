var Config = require('../config');
var Client = require('node-rest-client').Client;
var client = new Client();
var Itinerario = require('../models/itinerarioModel');
var Encomenda = require('../models/encomendaModel');
var schedule = require('node-schedule');

const PRONTA_EXPEDIR = "Pronta a Expedir";

// Todos os domingos, às 23:55 calcula itinerários
var j = schedule.scheduleJob('0 55 23 * * 7', function(){
    console.log('hey');
    calcularItinerarios();
  });

function calcularItinerarios() {

    client.get(Config.sicEntregasUrl + 'get_fabricas', function(data, response) {

        let fabricas = data;
    
        fabricas.forEach(fabrica => {
    
            getEncomendasFabrica(fabrica, function(encomendas) {
    
                let cidades = listaCidadesEncomendas(encomendas);
    
                if (cidades.length == 0)
                    return;
    
                cidades.unshift(fabrica); // adicionar fabrica ao início (caminho começa na fábrica)
    
                let args = {
                    data: cidades,
                    headers: { 'Content-Type': 'application/json' }
                }
    
                client.post(Config.sicEntregasUrl + 'calcular_rota', args, function(postData, response) {
    
                    if (response.statusCode == 201 || response.statusCode == 200)
                        addItinerario(postData);
    
                });
            });
        });
    });
}

function getEncomendasFabrica(fabrica, callback) {

    Encomenda.find({ fabricaAtribuida: fabrica, estado: PRONTA_EXPEDIR }, function(err, encomendas) {
        
        if (!err)
            callback(encomendas);
    });
}

function listaCidadesEncomendas(encomendas) {
    
    return encomendas.map(encomenda => encomenda.cidadeEntrega);
}

function addItinerario(data) {

    let custo = data.pop() / 1000; // conversão para Km

    let itinerario = new Itinerario();

    itinerario.fabrica = data[0];
    itinerario.itinerario = data;
    itinerario.custo = custo;

    itinerario.save(function(err) {

    });
}

module.exports.calcularItinerarios = calcularItinerarios;