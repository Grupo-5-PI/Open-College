var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/buscarDadosKpi/:parametros", function(req, res){
    dashboardController.buscarDadosKpi(req, res);
});

router.get("/buscarDadosGrafico/:parametros", function(req, res){
    dashboardController.buscarDadosGrafico(req, res);
});

router.get("/atualizarPerfil", function (req, res) {
    dashboardController.atualizarPerfil(req, res);
});

router.get("/atualizarRede", function (req, res) {
    dashboardController.atualizarRede(req, res);
});

router.get("/atualizarGenero", function (req, res) {
    dashboardController.atualizarGenero(req, res);
});

router.get("/atualizarKpiOcupacao", function (req, res) {
    dashboardController.atualizarKpiOcupacao(req, res);
});

router.get("/atualizarKpiCursoMaisProcurado", function (req, res) {
    dashboardController.atualizarKpiCursoMaisProcurado(req, res);
});

router.get("/atualizarKpiCursoMenosProcurado", function (req, res) {
    dashboardController.atualizarKpiCursoMenosProcurado(req, res);
});

router.get("/atualizarMatriculasDoCurso", function (req, res) {
    dashboardController.atualizarMatriculasDoCurso(req, res);
});

router.get("/atualizarTaxaOcupacaoPorArea", function (req, res) {
    dashboardController.atualizarTaxaOcupacaoPorArea(req, res);
});

router.get("/atualizarPeriodoMaisProcuradoPorCurso", function (req, res) {
    dashboardController.atualizarPeriodoMaisProcuradoPorCurso(req, res);
});


module.exports = router;