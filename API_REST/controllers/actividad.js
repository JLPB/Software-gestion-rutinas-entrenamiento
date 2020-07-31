// M�dulo que gestiona la tabla actividad
// M�dulos invocados
var conexion = require("./conexion");

// Funci�n para listar todas las actividades
exports.list = function (req, res) {
    conexion.query("SELECT * FROM actividad ORDER BY tipo ", function (error, rows, fields) {
        if (error) {
            console.log(error);
        }
        else {
            return res.json(rows);
        }
    });
}

// Funci�n para obtener una actividad seg�n su codigo
exports.get = function (req, res) {
    var codigo = req.params.codigo;
    conexion.query("SELECT * FROM actividad WHERE codigo=?", [codigo], function (error, rows) {
        if (error) {
            console.log(error);
        }
        else {
            return res.json(rows)
        }
    });
}

// Funci�n para crear una actividad en la base de datos
exports.add = function (req, res) {
    var json = JSON.parse(JSON.stringify(req.body));
    conexion.query("INSERT INTO actividad set ?", json, function (error, rows) {
        if (error) {
            console.log(error)
        }
        else {
            console.log("Actividad insertada en la base de datos")
        }
    });
    res.end();
}

// Funci�n para actualizar una actividad en la base de datos
exports.update = function (req, res) {
    var json = JSON.parse(JSON.stringify(req.body));
    var codigo = json.Codigo;
    conexion.query("UPDATE actividad set ? where codigo = ?", [json, codigo], function (error, rows) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Actividad actualizada en la base de datos");
        }
    });
    res.end();
}

// Funci�n para obtener el c�digo de la �ltima actividad creada
exports.ultimaActividadCreada = function (req, res) {
    conexion.query("SELECT codigo FROM actividad ORDER BY codigo DESC LIMIT 1", function (error, rows) {
        if (error) {
            console.log(error);
        }
        else {
            return res.json(rows)
        }
    });
}

// Funci�n para obtener los distintos tipos de actividades
exports.tipoActividad = function (req, res) {
    conexion.query("SELECT DISTINCT tipo FROM actividad  ORDER BY tipo ", function (error, rows) {
        if (error) {
            console.log(error);
        }
        else {
            return res.json(rows)
        }
    });
}

// Funci�n para filtrar las actividades por tipo, s�lo muestra las actividades activas
exports.actividadesPorTipo = function (req, res) {
    var tipoActividad = req.params.tipoActividad;
    conexion.query("SELECT * FROM actividad WHERE tipo = ? AND activa = 1 ORDER BY nombre ",[tipoActividad], function (error, rows) {
        if (error) {
            console.log(error);
        }
        else {
            return res.json(rows)
        }
    });
}