// M�dulo que gestiona la tabla rutina
// M�dulos invocados
var conexion = require("./conexion");

// Funci�n para listar todas las rutinas de la tabla
exports.list = function (req, res) {
    conexion.query("SELECT * FROM rutina ORDER BY nombre ASC ", function (error, rows, fields) {
        if (error) {
            console.log(error);
        }
        else {
            return res.json(rows);
        }
    });
}

// Funci�n para listar todas las rutinas del entrenador
exports.listaRutinasEntrenador= function (req, res) {
    var dni_usuario = req.params.dni_usuario;
    conexion.query("SELECT * FROM rutina where dni_usuario = ? ORDER BY nombre ASC", [dni_usuario], function (error, rows, fields) {
        if (error) {
            console.log(error);
        }
        else {
            return res.json(rows);
        }
    });
}

// Funci�n para listar todas las rutinas del entrenador que est�n activas
exports.listaRutinasActivas = function (req, res) {
    var dni_usuario = req.params.dni_usuario;
    conexion.query("SELECT * FROM rutina where activa= 1 AND dni_usuario = ? ORDER BY nombre ASC", [dni_usuario], function (error, rows, fields) {
        if (error) {
            console.log(error);
        }
        else {
            return res.json(rows);
        }
    });
}

// Funci�n para obtener una rutina seg�n su c�digo
exports.get = function (req, res) {
    var codigo = req.params.codigo;
    conexion.query("SELECT * FROM rutina WHERE codigo=?", [codigo], function (error, rows) {
        if (error) {
            console.log(error);
        }
        else {
            return res.json(rows)
        }
    });
}

// Funci�n para crear una rutina en la base de datos
exports.add = function (req, res) {
    var json = JSON.parse(JSON.stringify(req.body));
    conexion.query("INSERT INTO rutina set ?", json, function (error, rows) {
        if (error) {
            console.log(error)
        }
        else {
            console.log("Rutina insertada en la base de datos")
        }
    });
    res.end();
}

// Funci�n para actualizar una rutina en la base de datos
exports.update = function (req, res) {
    var json = JSON.parse(JSON.stringify(req.body));
    var codigo = json.Codigo;
    conexion.query("UPDATE rutina set ? where codigo= ?", [json, codigo], function (error, rows) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Rutina actualizada en la base de datos");
        }
    });
    res.end();
}

//Funci�n para obtener el c�digo de la �ltima rutina creada
exports.ultimaRutina = function (req, res) {
    conexion.query("SELECT codigo FROM rutina ORDER BY codigo DESC LIMIT 1", function (error, rows) {
        if (error) {
            console.log(error);
        }
        else {
            return res.json(rows);
        }
    });
}

// Funci�n para obtener una rutina seg�n su c�digo
exports.busquedaNombreRutina = function (req, res) {
    var nombre = req.params.nombre;
    var dni_usuario = req.params.dni_usuario;
    conexion.query("SELECT * FROM rutina WHERE nombre LIKE ? AND dni_usuario = ?", [nombre,dni_usuario], function (error, rows) {
        if (error) {
            console.log(error);
        }
        else {
            return res.json(rows)
        }
    });
}