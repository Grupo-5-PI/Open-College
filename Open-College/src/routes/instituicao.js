var express = require("express");
var router = express.Router();

var instituicaoControler = require("../controllers/instituicaoController");

router.post("/cadastrar", function (req, res) {
    instituicaoControler.cadastrar(req, res);
})
router.get("/listarTodas", function (req, res) {
    instituicaoControler.listarTodas(req, res);
})
router.get("/buscar/:cnpj", function (req, res) {
    instituicaoControler.buscarPorCnpj(req, res);
})

module.exports = router;