var express = require("express");
var router = express.Router();

var instituicaoController = require("../controllers/instituicaoController");

router.post("/cadastrar", function (req, res) {
    instituicaoController.cadastrar(req, res);
})
router.get("/listarTodas", function (req, res) {
    instituicaoController.listarTodas(req, res);
})
router.get("/buscar/:cnpj", function (req, res) {
    instituicaoController.buscarPorCnpj(req, res);
})

router.get("/buscar/:idUsuario", function(req, res){
    instituicaoController.buscarPorIdUsuario(req, res);
})

router.post("/adicionarPolo", function(req, res){
    instituicaoController.adicionarPolo(req, res);
})

module.exports = router;