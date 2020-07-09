// M�dulo que gestiona la tabla rol
// M�dulos invocados
var conexion = require("./conexion");

// Funci�n para listar todos los roles ordenados alfab�ticamente
exports.list = function (req, res) {
    conexion.query("SELECT * FROM rol ORDER BY nombre ASC", function (error, rows, fields) {
        if (error) {
            console.log(error);
        }
        else {
            return res.json(rows);
        }
    });
}

// Funci�n para obtener un rol seg�n su codigo
exports.get = function (req, res) {
    var codigo = req.params.codigo;
    conexion.query("SELECT * FROM rol WHERE codigo=?", [codigo], function (error, rows) {
        if (error) {
            console.log(error);
        }
        else {
            return res.json(rows)
        }
    });
}