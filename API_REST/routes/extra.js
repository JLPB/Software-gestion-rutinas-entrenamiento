// Gesti�n de peticiones a producto y ruteado a los m�dulos de producto
// Imports
var express = require("express");
var router = express.Router();
var extra = require("../controllers/extra");

//Manejador de rutas
router.get("/detener", extra.detener);

module.exports = router;