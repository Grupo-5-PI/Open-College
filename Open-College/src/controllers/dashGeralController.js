var dashGeralModel = require("../models/dashGeralModel");

function kpiTotalMatriculas(req, res) {

    var ano = req.params.ano;

    dashGeralModel.kpiTotalMatriculas(ano)
        .then(function (resultado) {
            res.status(200).json([{

                totalMatriculas: resultado[0].totalMatriculas
            }])
        })
        .catch(function (erro) {

            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function kpiTotalConcluintes(req, res) {

    var ano = req.params.ano;

    dashGeralModel.kpiTotalConcluintes(ano)
        .then(function (resultado) {

            res.status(200).json([{

                totalConcluintes: resultado[0].totalConcluintes
            }])
        })
        .catch(function (erro) {

            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function kpiModalidadeMaisProcurada(req, res) {

    var ano = req.params.ano;

    dashGeralModel.kpiModalidadeMaisProcurada(ano)
        .then(function (resultado) {

            res.status(200).json([{

                modalidade: resultado[0].modalidade
            }])
        })
        .catch(function (erro) {

            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function kpiPeriodoMaisProcurado(req, res) {

    var ano = req.params.ano;

    dashGeralModel.kpiPeriodoMaisProcurado(ano)
        .then(function (resultado) {
            res.status(200).json([{

                totalDiurno: resultado[0].totalDiurno,
                totalNoturno: resultado[0].totalNoturno

            }])
        })
        .catch(function (erro) {
            console.log(erro);

            res.status(500).json(erro.sqlMessage);
        });
}

function kpiAreaMaisProcurada(req, res) {

    var ano = req.params.ano;

    dashGeralModel.kpiAreaMaisProcurada(ano)
        .then(function (resultado) {
            res.status(200).json([{

                areaGeral: resultado[0].areaGeral,
            }])
        })
        .catch(function (erro) {

            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function kpiTipoGraduacaoMaisProcurada(req, res) {

    var ano = req.params.ano;

    dashGeralModel.kpiTipoGraduacaoMaisProcurada(ano)
        .then(function (resultado) {
            res.status(200).json([{

                tipoGrauAcademico: resultado[0].tipoGrauAcademico,
            }])
        })
        .catch(function (erro) {

            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function graficoGraduacaoMaisProcurada(req, res) {

    var ano = req.params.ano;

    dashGeralModel.graficoGraduacaoMaisProcurada(ano)
        .then(function (resultado) {

            res.status(200).json(resultado)
        })
        .catch(function (erro) {

            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function graficoAreaGeralMaisProcurada(req, res) {

    var ano = req.params.ano;

    dashGeralModel.graficoAreaGeralMaisProcurada(ano)
        .then(function (resultado) {

            res.status(200).json(resultado)
        })
        .catch(function (erro) {

            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function graficoModalidadeMaisProcurada(req, res) {

    var ano = req.params.ano;

    dashGeralModel.graficoModalidadeMaisProcurada(ano)
        .then(function (resultado) {

            res.status(200).json(resultado)
        })
        .catch(function (erro) {

            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    kpiTotalMatriculas,
    kpiTotalConcluintes,
    kpiModalidadeMaisProcurada,
    kpiPeriodoMaisProcurado,
    kpiAreaMaisProcurada,
    kpiTipoGraduacaoMaisProcurada,
    graficoGraduacaoMaisProcurada,
    graficoAreaGeralMaisProcurada,
    graficoModalidadeMaisProcurada,
};
