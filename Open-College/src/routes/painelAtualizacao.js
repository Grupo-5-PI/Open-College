var express = require("express");
var router = express.Router();

var painelAtualizacaoController = require("../controllers/painelAtualizacaoController");

router.get("/buscarNoticias", function (req, res) {
    painelAtualizacaoController.buscarNoticias(req, res);
});

module.exports = router;