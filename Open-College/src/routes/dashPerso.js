var express = require("express");
var router = express.Router();

var dashPersoController = require("../controllers/dashPersoController");

router.get("/layout/:userId", function (req, res) {
    dashPersoController.getLayout(req, res);
});

router.put("/layout/:userId", function (req, res) {
    dashPersoController.putLayout(req, res);
});

module.exports = router;