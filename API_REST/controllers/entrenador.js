// M�dulo que gestiona la tabla entrenador
// M�dulos invocados
var conexion = require("./conexion");

// Funci�n para obtener la lista de usuarios con el rol de entrenador y que est�n activos
exports.listaEntrenadoresActivos = function (req, res) {
    var dni = req.params.dni;
    conexion.query("SELECT * FROM entrenador, usuario, tener  WHERE entrenador.dni_usuario = usuario.dni AND tener.dni_usuario = usuario.dni AND usuario.activo = 1 AND tener.codigo_rol = 1", function (error, rows) {
        if (error) {
            console.log(error);
        }
        else {
            return res.json(rows)
        }
    });
}

// Funci�n para obtener los datos de un entrenador utilizando su DNI
exports.get = function (req, res) {
    var dni = req.params.dni;
    conexion.query("SELECT * FROM entrenador WHERE dni_usuario=?", [dni], function (error, rows) {
        if (error) {
            console.log(error);
        }
        else {
            return res.json(rows)
        }
    });
}

// Funci�n para crear los datos de un entrenador
exports.add = function (req, res) {
    var json = JSON.parse(JSON.stringify(req.body));
    var datos = {
        dni_usuario: json.Dni_usuario,
        biografia: json.Biografia
    };
    conexion.query("INSERT INTO entrenador set ?", datos, function (error, rows) {
        if (error) {
            console.log(error)
        }
        else {
            console.log("Datos del entrenador insertados en la base de datos")
        }
    });
    res.end();
}

// Funci�n para actualizar los datos de un entrenador en la base de datos
exports.update = function (req, res) {
    var json = JSON.parse(JSON.stringify(req.body));
    var dni = json.Dni_usuario;
    var datos = {
        dni_usuario: json.Dni_usuario,
        biografia: json.Biografia
    };
    conexion.query("UPDATE entrenador set ? where dni_usuario= ?", [datos, dni], function (error, rows) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Datos del entrenador actualizados en la base de datos");
        }
    });
    res.end();
}

// Funci�n para dar borrar la biografia del entrenador --> No se usa
exports.borrarBiografia = function (req, res) {
    var dni = req.params.dni;
    conexion.query("UPDATE entrenador set biografia = '' where dni_usuario= ?", [dni], function (error, rows) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Biografia del entrenador borrada");
        }
    });
    res.end();
}

// Funci�n que devuelve el n�mero de alumnos que tiene asignado un entrenador

exports.numeroAlumnosAsignados = function (req, res) {
    var dni = req.params.dni;
    conexion.query("SELECT COUNT(alumno.dni_usuario) AS total FROM usuario, alumno WHERE usuario.dni = dni_usuario AND entrenador_asignado = ? AND usuario.activo = 1", [dni], function (error, rows) {
        if (error) {
            console.log(error);
        }
        else {
            return res.json(rows)
        }
    });
}