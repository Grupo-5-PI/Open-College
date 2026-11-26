var express = require("express");
var router = express.Router();

var painelAtualizacaoController = require("../controllers/painelAtualizacaoController");

router.get("/buscarNoticias", function (req, res) {
    painelAtualizacaoController.buscarNoticias(req, res);
});

router.put("/avaliarNoticia", function (req, res) {
    painelAtualizacaoController.avaliarNoticia(req, res);
});

router.put("/atualizarInteresse", function (req, res) {
    painelAtualizacaoController.atualizarInteresse(req, res);
});


module.exports = router;