var painelAtualizacaoModel = require("../models/painelAtualizacaoModel");

function buscarNoticias(req, res) {

    painelAtualizacaoModel.buscarNoticias()
        .then(function (resultado) {
            if (!resultado || resultado.length == 0) return res.status(204).send();
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });

}

module.exports = {
    buscarNoticias,
}