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


function avaliarNoticia(req, res) {
    var idNoticia = req.body.idNoticia
    var delta = Number(req.body.delta)

    if (idNoticia == undefined) {
        res.status(400).send("O idNoticia está undefined!");
        return;
    }

    if (delta !== 1 && delta !== -1) {
        res.status(400).send("Valor de avaliação inválido!");
        return;
    }

    painelAtualizacaoModel.avaliarNoticia(idNoticia, delta)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao avaliar a notícia! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarNoticias,
}