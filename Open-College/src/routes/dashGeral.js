var express = require("express");
var router = express.Router();

var dashGeralController = require("../controllers/dashGeralController");

router.get("/kpiTotalMatriculas/:ano", function (req, res) {
 
    dashGeralController.kpiTotalMatriculas(req, res);
})

router.get("/kpiTotalConcluintes/:ano", function (req, res) {
    
    dashGeralController.kpiTotalConcluintes(req, res);
})

router.get("/kpiModalidadeMaisProcurada/:ano", function (req, res) {
    
    dashGeralController.kpiModalidadeMaisProcurada(req, res);
})

router.get("/kpiPeriodoMaisProcurado/:ano", function (req, res) {
    
    dashGeralController.kpiPeriodoMaisProcurado(req, res);
})

router.get("/kpiAreaMaisProcurada/:ano", function (req, res) {
    
    dashGeralController.kpiAreaMaisProcurada(req, res);
})

router.get("/kpiTipoGraduacaoMaisProcurada/:ano", function (req, res) {
    
    dashGeralController.kpiTipoGraduacaoMaisProcurada(req, res);
})

router.get("/graficoGraduacaoMaisProcurada/:ano", function (req, res) {
    
    dashGeralController.graficoGraduacaoMaisProcurada(req, res);
})

router.get("/graficoAreaGeralMaisProcurada/:ano", function (req, res) {
    
    dashGeralController.graficoAreaGeralMaisProcurada(req, res);
})

router.get("/graficoModalidadeMaisProcurada/:ano", function (req, res) {
    
    dashGeralController.graficoModalidadeMaisProcurada(req, res);
})

module.exports = router;
