var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Itinerario = new Schema({
    fabrica: String,
    itinerario: [String],
    custo: Number,
    data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Itinerario', Itinerario);