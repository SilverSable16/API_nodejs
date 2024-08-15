const db = require('../config/db.config.js');
const Libro = db.Libro;

exports.create = (req, res) => {
    let libro = {};

    try {
        libro.nombre = req.body.nombre;
        libro.editorial = req.body.editorial;
        libro.autor = req.body.autor;
        libro.genero = req.body.genero;
        libro.paisAutor = req.body.paisAutor;
        libro.numeroPaginas = req.body.numeroPaginas;
        libro.añoEdicion = req.body.añoEdicion;
        libro.precio = req.body.precio;

        Libro.create(libro).then(result => {    
            res.status(200).json({
                message: "Libro creado exitosamente con codigo = " + result.codigo,
                libro: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}
exports.retrieveAllLibros = (req, res) => {
    Libro.findAll()
        .then(libros => {
            res.status(200).json({
                message: "¡Todos los libros obtenidos exitosamente!",
                libros: libros
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}
exports.getLibroByCodigo = (req, res) => {
    let libroCodigo = req.params.codigo;
    Libro.findByPk(libroCodigo)
        .then(libro => {
            res.status(200).json({
                message: "Libro obtenido exitosamente con codigo = " + libroCodigo,
                libro: libro
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}
exports.updateByCodigo = async (req, res) => {
    try {
        let libroCodigo = req.params.codigo;
        let libro = await Libro.findByPk(libroCodigo);

        if (!libro) {
            res.status(404).json({
                message: "No se encontró el libro con codigo = " + libroCodigo,
                libro: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                nombre: req.body.nombre,
                editorial: req.body.editorial,
                autor: req.body.autor,
                genero: req.body.genero,
                paisAutor: req.body.paisAutor,
                numeroPaginas: req.body.numeroPaginas,
                añoEdicion: req.body.añoEdicion,
                precio: req.body.precio
            };
            let result = await Libro.update(updatedObject, { returning: true, where: { codigo: libroCodigo } });
            
            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el libro con codigo = " + req.params.codigo,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Libro actualizado exitosamente con codigo = " + libroCodigo,
                libro: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el libro con codigo = " + req.params.codigo,
            error: error.message
        });
    }
}
exports.deleteByCodigo = async (req, res) => {
    try {
        let libroCodigo = req.params.codigo;
        let libro = await Libro.findByPk(libroCodigo);

        if (!libro) {
            res.status(404).json({
                message: "No existe el libro con codigo = " + libroCodigo,
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Libro eliminado exitosamente con codigo = " + libroCodigo,
                libro: libro,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el libro con codigo = " + req.params.codigo,
            error: error.message,
        });
    }
}

