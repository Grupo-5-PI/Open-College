var instituicaoModel = require("../models/instituicaoModel");


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    // var modo = req.body.modoServer;
    var idUsuario = req.body.idUsuarioServer;
    var nome = req.body.nomeServer;
    var cnpj = req.body.cnpjServer;
    var idInstituicao = req.body.idInstituicaoServer;
    

    // Faça as validações dos valores
    if (idUsuario == undefined) {
        res.status(400).send("O usuario está undefined!");
    }
    // else if(modo == "novaInstituicao"){
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
    // }
    // else if(modo == "vincularInstituicao"){
    //     if(idInstituicao == undefined || idInstituicao == ""){
    //         res.status(400).send("Selecione uma instituicao!");
    //     }else{
    //         instituicaoModel.vincularUsuario(idUsuario, idInstituicao)
    //         .then(function () {
    //             res.json({idInstituicao: idInstituicao});
    //         })
    //         .catch(function (erro){
    //             console.log(erro);
    //             console.log("\m Houve um erro ao vincular a instituicao! ERRO: ", erro.sqlMessage);
    //             res.status(500).json(erro.sqlMessage);
    //         });
    //     }
    // }else{
    //     res.status(400).send("Modo inválido");
    // }
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

    function criarSolicitacaoEntrada(req, res){

        let idUsuario = req.body.idUsuarioServer;
        let idInstituicao = req.body.idInstituicaoServer;

        instituicaoModel.criarSolicitacaoEntrada(idUsuario, idInstituicao)
        .then(function(resposta){
            console.log(resposta);
            res.status(200).json(resposta);
        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).send(erro);
        })

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
                // res.json(resposta);
                res.status(200).json(resposta);
            } else{
                res.status(204).send();
            }
        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).json(erro);
        })

    }

    async function adicionarPolo(req, res){

        let logradouro = req.body.logradouroServer;
        let numero = req.body.numeroServer;
        let bairro = req.body.bairroServer;
        let municipio = req.body.municipioServer;
        let uf = req.body.ufServer;
        let idInstituicao = req.body.idInstituicaoServer;
        let idPolo = (await instituicaoModel.buscarIdParaAdicionarPolo(idInstituicao))[0]?.ultimoId + 1;
        
        if(isNaN(idPolo) || idPolo == undefined){
            idPolo = 1;
        }
        
        console.log("idPolo: ", idPolo);
            
        instituicaoModel.adicionarPolo(logradouro, numero, bairro, municipio, uf, idInstituicao, idPolo)
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

    function buscarMembrosInstituicao(req, res){

        let idInstituicao = req.params.idInstituicao;

        instituicaoModel.buscarMembrosInstituicao(idInstituicao)
        .then(function(resposta){
            if(resposta.length > 0){
                console.log(resposta);
                res.status(200).json(resposta);
            } else{
                res.status(204).send("Nenhum membro na instituição!");
            }
        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).json(erro);
        })
        
    }

    async function removerUsuarioDaInstituicao(req, res){

        let idUsuarios = req.body.idUsuarios;

        let deuErroNaRequisicao;

        for(let i = 0; i < idUsuarios.length; i++){
            let idUsuario = idUsuarios[i];
            deuErroNaRequisicao = await instituicaoModel.removerUsuarioDaInstituicao(idUsuario).
                then(function(resposta){
                    console.log(resposta);
                    return false;
                })
                .catch(function(erro){
                    console.log(erro);
                    return true;
                })

                if(deuErroNaRequisicao){
                    break;
                }
        }

        if(deuErroNaRequisicao){
            res.status(500).send("Erro ao remover usuários!");
        }

        res.status(204).send("Usuários removidos com sucesso!");
        
    }

    async function promoverUsuario(req, res){

        let idUsuarios = req.body.idUsuarios;

        let deuErroNaRequisicao;

        for(let i = 0; i < idUsuarios.length; i++){
            let idUsuario = idUsuarios[i];
            deuErroNaRequisicao = await instituicaoModel.promoverUsuario(idUsuario).
                then(function(resposta){
                    console.log(resposta);
                    return false;
                })
                .catch(function(erro){
                    console.log(erro);
                    return true;
                })

                if(deuErroNaRequisicao){
                    break;
                }
        }

        if(deuErroNaRequisicao){
            res.status(500).send("Erro ao promover usuários!");
        }

        res.status(200).send("Usuários promovidos com sucesso!");
    }

    function buscarDadosPolo(req, res){

        let dadosPolo = JSON.parse(req.params.parametros);
        
        let idInstituicao = dadosPolo.idInstituicaoParam;
        let idPolo = dadosPolo.idPoloParam;

        instituicaoModel.buscarDadosPolo(idInstituicao, idPolo)
        .then(function(resposta){
            if(resposta.length > 0){
                console.log(resposta);
                res.status(200).json(resposta[0]);
            } else{
                res.status(404).send("Polo não encontrado!");
            }
        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).json(erro);
        })
        
    }
                        
    function editarPolo(req, res){

        let logradouro = req.body.logradouroServer;
        let numero = req.body.numeroServer;
        let bairro = req.body.bairroServer;
        let municipio = req.body.municipioServer;
        let uf = req.body.ufServer;
        let idInstituicao = req.body.idInstituicaoServer;
        let idPolo = req.body.idPoloServer;

        instituicaoModel.editarPolo(logradouro, numero, bairro, municipio, uf, idInstituicao, idPolo)
        .then(function(resposta){
            console.log(resposta);
            res.status(200).json(resposta);
        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).json(erro);
        })

    }

    function excluirPolo(req, res){

        let dadosPolo = JSON.parse(req.params.parametros);

        let idInstituicao = dadosPolo.idInstituicaoParam;
        let idPolo = dadosPolo.idPoloParam;

        instituicaoModel.excluirCursosPolo(idInstituicao, idPolo)
        .then(function(resposta){
            console.log(resposta);

            instituicaoModel.excluirPolo(idInstituicao, idPolo)
            .then(function(resposta){
                console.log(resposta);
                res.status(204).send();
            })
            .catch(function(erro){
                console.log(erro);
                res.status(500).json(erro);
            })

        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).json(erro);
        })

        // instituicaoModel.excluirPolo(idInstituicao, idPolo)
        // .then(function(resposta){
        //     console.log(resposta);
        //     res.status(204).send();
        // })
        // .catch(function(erro){
        //     console.log(erro);
        //     res.status(500).json(erro);
        // })
        
    }

    function buscarCursos(req, res){

        let dadosPolo = JSON.parse(req.params.parametros);

        let idInstituicao = dadosPolo.idInstituicaoParam;
        let idPolo = dadosPolo.idPoloParam;

        instituicaoModel.buscarCursos(idInstituicao, idPolo)
        .then(function(resposta){
            
            if(resposta.length > 0){
                res.status(200).json(resposta);
            } else{
                res.status(204).send();
            }
            
        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).json(erro);
        })
        
    }

    async function adicionarCurso(req, res){
        
        let idInstituicao = req.body.idInstituicaoServer;
        let idPolo = req.body.idPoloServer;
        let idCurso = req.body.idCursoServer;
        let turno = req.body.turnoServer;
        let modalidade = req.body.modalidadeServer;
        let idInstituicaoPoloCurso = (await instituicaoModel.buscarIdParaAdicionarCurso(idInstituicao, idPolo))[0]?.ultimoId + 1;

        if(isNaN(idInstituicaoPoloCurso) || idInstituicaoPoloCurso == undefined){
            idInstituicaoPoloCurso = 1;
        }
        
        instituicaoModel.adicionarCurso(idInstituicaoPoloCurso, idInstituicao, idPolo, idCurso, turno, modalidade)
        .then(function(resposta){
            console.log(resposta);
            res.status(201).json(resposta);
        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).json(erro);
        })
        
    }

    function buscarDadosCurso(req, res){

        let dadosCurso = JSON.parse(req.params.parametros);

        let idInstituicao = dadosCurso.idInstituicaoParam;
        let idPolo = dadosCurso.idPoloParam;
        let idCurso = dadosCurso.idCursoParam;

        instituicaoModel.buscarDadosCurso(idInstituicao, idPolo, idCurso)
        .then(function(resposta){
            if(resposta.length > 0){
                console.log(resposta);
                res.status(200).json(resposta[0]);
            } else{
                console.log(resposta);
                res.status(404).send("Polo não encontrado!");
            }
        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).json(erro);
        })
        
    }

    function editarCurso(req, res){

        let idInstituicao = req.body.idInstituicaoServer;
        let idPolo = req.body.idPoloServer;
        let idCurso = req.body.idCursoServer;
        let turno = req.body.turnoServer;
        let modalidade = req.body.modalidadeServer;

        instituicaoModel.editarCurso(idInstituicao, idPolo, idCurso, turno, modalidade)
        .then(function(resposta){
            console.log(resposta);
            res.status(200).json(resposta);
        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).json(erro);
        })
        
    }

    function atualizarEstatisticasCurso(req, res){

        let idInstituicao = req.body.idInstituicaoServer;
        let idPolo = req.body.idPoloServer;
        let idCurso = req.body.idCursoServer;
        let vagas = req.body.vagasServer;
        let matriculas = req.body.matriculasServer;

        instituicaoModel.atualizarEstatisticasCurso(idInstituicao, idPolo, idCurso, vagas, matriculas)
        .then(function(resposta){
            console.log(resposta);
            res.status(200).json(resposta);
        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).json(erro);
        })
        
    }

    function atualizarMetasCurso(req, res){

        let idInstituicao = req.body.idInstituicaoServer;
        let idPolo = req.body.idPoloServer;
        let idCurso = req.body.idCursoServer;
        let matriculas = req.body.matriculasServer;
        let dataMeta = req.body.dataMetaServer;

        instituicaoModel.atualizarMetasCurso(idInstituicao, idPolo, idCurso, matriculas, dataMeta)
        .then(function(resposta){
            console.log(resposta);
            res.status(200).json(resposta);
        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).json(erro);
        })
        
    }

    function excluirCurso(req, res){

        let dadosCurso = JSON.parse(req.params.parametros);

        let idInstituicao = dadosCurso.idInstituicaoParam;
        let idPolo = dadosCurso.idPoloParam;
        let idCurso = dadosCurso.idCursoParam;

        instituicaoModel.excluirCurso(idInstituicao, idPolo, idCurso)
        .then(function(resposta){
            console.log(resposta);
            res.status(204).send();
        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).json(erro);
        });
        
    }
    
module.exports = {
    cadastrar,
    listarTodas,
    buscarPorCnpj,
    criarSolicitacaoEntrada,
    buscarPorIdUsuario,
    buscarPolos,
    adicionarPolo,
    buscarMembrosInstituicao,
    removerUsuarioDaInstituicao,
    promoverUsuario,
    buscarDadosPolo,
    editarPolo,
    excluirPolo,
    buscarCursos,
    adicionarCurso,
    buscarDadosCurso,
    editarCurso,
    atualizarEstatisticasCurso,
    atualizarMetasCurso,
    excluirCurso,
};