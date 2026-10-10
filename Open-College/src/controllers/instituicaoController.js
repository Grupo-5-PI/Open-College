var instituicaoModel = require("../models/instituicaoModel");


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var modo = req.body.modoServer;
    var idUsuario = req.body.idUsuarioServer;
    var nome = req.body.nomeServer;
    var cnpj = req.body.cnpjServer;
    var idInstituicao = req.body.idInstituicaoServer;
    

    // Faça as validações dos valores
    if (idUsuario == undefined) {
        res.status(400).send("O usuario está undefined!");
    }
    else if(modo == "novaInstituicao"){
     if(nome == undefined || cnpj == undefined){
        res.status(400).send("Nome e CNPJ sao obrigatorios!");
        
     }else{
        instituicaoModel.cadastrar(nome,cnpj)
        .then(function (resposta){
            return instituicaoModel.vincularUsuario(idUsuario, resposta.insertId)
            .then(function (){
                res.json({idInstituicao: resposta.insertId});
            });
        })
        .catch(function (erro){
            console.log(erro);
            console.log("\n Houve um erro ao cadastrar a instituicao! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
     }
    }else if(modo == "vincularInstituicao"){
        if(idInstituicao == undefined || idInstituicao == ""){
            res.status(400).send("Selecione uma instituicao!");
        }else{
            instituicaoModel.vincularUsuario(idUsuario, idInstituicao)
            .then(function () {
                res.json({idInstituicao: idInstituicao});
            })
            .catch(function (erro){
                console.log(erro);
                console.log("\m Houve um erro ao vincular a instituicao! ERRO: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
        }
    }else{
        res.status(400).send("Modo inválido");
    }
}
    function listarTodas(req,res){
        instituicaoModel.listarTodas()
        .then(
            function (resultado){
                res.json(resultado);
            }
        ).catch(function (erro) {
            console.log(erro);
            console.log("\n Houve um erro ao listar as instituicoes! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
        );
    }
    function buscarPorCnpj(req, res){
        var cnpj = req.params.cnpj;

        if(cnpj == undefined){
            res.status(400).send("O CNPJ está undefined");
        }else{
            instituicaoModel.buscarPorCnpj(cnpj)
            .then(
                function (resultado) {
                    if(resultado.length > 0){
                        res.json(resultado[0]);
                    }else{
                        res.status(404).send("Instituicao nao encontrada");
                    }
                }
            ).catch(
                function (erro){
                    console.log(erro);
                    console.log("\n Houve um erro ao buscar a instituicao! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
        }
    }

    function buscarPorIdUsuario(req, res){

        let idUsuario = req.params.idUsuario;

        if(idUsuario == undefined){
            res.status(400).send("ID Usuário está undefined!");
        } else{

            instituicaoModel.buscarPorIdUsuario(idUsuario)
            .then(function (resposta){

                if(resposta.length > 0){
                    res.json(resposta[0]);    
                } else{
                    res.status(404).send("Instituição não encontrada!");
                }

            })
            .catch(function(erro){
                console.log(erro);
                // console.log("\nHouve um erro ao buscar a instituição! Erro: ", erro.sqlMessage);
                // res.status(500).erro.sqlMessage;
            })

        }

    }

    function buscarPolos(req, res){

        let idInstituicao = req.params.idInstituicao;

        instituicaoModel.buscarPolos(idInstituicao)
        .then(function(resposta){
            if(resposta.length > 0){
                res.json(resposta);
                res.status(200);
            } else{
                res.status(204);
            }
        })
        .catch(function(erro){
            console.log(erro);
        })

    }

    function adicionarPolo(req, res){

        let logradouro = req.body.logradouroServer;
        let numero = req.body.numeroServer;
        let bairro = req.body.bairroServer;
        let municipio = req.body.municipioServer;
        let uf = req.body.ufServer;
        let idInstituicao = req.body.idInstituicaoServer;
            
        instituicaoModel.adicionarPolo(logradouro, numero, bairro, municipio, uf, idInstituicao)
        .then(function(resposta){
            res.status(201);
            res.json(resposta);
            // res.body(resposta);
        })
        .catch(function(erro){
            console.log(erro);
            // console.log("\nHouve um erro ao adicionar o polo! Erro : ", erro.sqlMessage);
            // res.status(500).erro.sqlMessage;
        })
            
    }
                        
module.exports = {
    cadastrar,
    listarTodas,
    buscarPorCnpj,
    buscarPorIdUsuario,
    buscarPolos,
    adicionarPolo,
   
};