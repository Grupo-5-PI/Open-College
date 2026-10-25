var dashPersoModel = require("../models/dashPersoModel");

function getLayout(req, res) {
    var userId = req.params.userId;

    if (userId == undefined) {
        res.status(400).send("O Usuario está undefined!");
    } else {
        dashPersoModel.buscarLayout(userId)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json({
                        kpi: resultado[0].kpi,
                        grafico: resultado[0].grafico
                    });
                } else {
                    // Se não achar nada no banco, retorna vazio para o front
                    res.status(200).json({ kpi: null, grafico: null });
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar o layout! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function putLayout(req, res) {
    var userId = req.params.userId;
    var kpi = req.body.kpi || null;
    var grafico = req.body.grafico || null;

    if (userId == undefined) {
        res.status(400).send("O Usuario está undefined!");
    } else {
        // Validações (Whitelist)
        if (kpi !== null && !dashPersoModel.KPIS_VALIDOS.includes(kpi)) {
            return res.status(400).send("kpi inválido");
        }
        if (grafico !== null && !dashPersoModel.GRAFICOS_VALIDOS.includes(grafico)) {
            return res.status(400).send("grafico inválido");
        }

        dashPersoModel.salvarLayout(userId, kpi, grafico)
            .then(function (resultado) {
                res.status(200).json({ ok: true });
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao salvar o layout! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    getLayout,
    putLayout
};