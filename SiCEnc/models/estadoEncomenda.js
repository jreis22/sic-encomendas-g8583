const estadosEncomenda = ["Submetida", 
                        "Validada", 
                        "Assignada",
                        "Em Producao", 
                        "Em Embalamento", 
                        "Pronta a Expedir", 
                        "Expedida", 
                        "Entregue", 
                        "Rececionada", 
                        "Cancelada"];

module.exports.estadosArr = function() {
    return estadosEncomenda;
}
