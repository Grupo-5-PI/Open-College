var express = require("express");
var router = express.Router();

var instituicaoController = require("../controllers/instituicaoController");

router.post("/cadastrar", function (req, res) {
    instituicaoController.cadastrar(req, res);
});

router.get("/listarTodas", function (req, res) {
    instituicaoController.listarTodas(req, res);
});

router.get("/buscar/:cnpj", function (req, res) {
    instituicaoController.buscarPorCnpj(req, res);
});

router.get("/buscarPorIdUsuario/:idUsuario", function(req, res){
    instituicaoController.buscarPorIdUsuario(req, res);
});

router.get("/buscarPolos/:idInstituicao", function(req, res){
    instituicaoController.buscarPolos(req, res);
});

router.post("/adicionarPolo", function(req, res){
    instituicaoController.adicionarPolo(req, res);
});

router.get("/buscarDadosPolo/:parametros", function(req, res){
    instituicaoController.buscarDadosPolo(req, res);
});

router.post("/editarPolo", function(req, res){
    instituicaoController.editarPolo(req, res);
});

router.delete("/excluirPolo/:parametros", function(req, res){
    instituicaoController.excluirPolo(req, res);
});

router.get("/buscarCursos/:parametros", function(req, res){
    instituicaoController.buscarCursos(req, res);
});

router.post("/adicionarCurso", function(req, res){
    instituicaoController.adicionarCurso(req, res);
});

router.get("/buscarDadosCurso/:parametros", function(req, res){
    instituicaoController.buscarDadosCurso(req, res);
});

router.post("/editarCurso", function(req, res){
    instituicaoController.editarCurso(req, res);
});

router.post("/atualizarEstatisticasCurso", function(req, res){
    instituicaoController.atualizarEstatisticasCurso(req, res);
});

router.delete("/excluirCurso/:parametros", function(req, res){
    instituicaoController.excluirCurso(req, res);
});

module.exports = router;