var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/buscarDadosKpi/:parametros", function(req, res){
    dashboardController.buscarDadosKpi(req, res);
});

module.exports = router;