const db = require('../config/db.config.js');
const Prestamo = db.Prestamo;

exports.create = (req, res) => {
    let prestamo = {};

    try {
        prestamo.numero_pedido = req.body.numero_pedido;
        prestamo.codigo_libro = req.body.codigo_libro;
        prestamo.codigo_usuario = req.body.codigo_usuario;
        prestamo.fecha_salida = req.body.fecha_salida;
        prestamo.fecha_maxima_devolver = req.body.fecha_maxima_devolver;
        prestamo.fecha_devolucion = req.body.fecha_devolucion;

        Prestamo.create(prestamo).then(result => {    
            res.status(200).json({
                message: "Préstamo creado exitosamente con id = " + result.id,
                prestamo: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

exports.retrieveAllPrestamos = (req, res) => {
    Prestamo.findAll()
        .then(prestamos => {
            res.status(200).json({
                message: "¡Todos los préstamos obtenidos exitosamente!",
                prestamos: prestamos
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

exports.getPrestamoById = (req, res) => {
    let prestamoId = req.params.id;
    Prestamo.findByPk(prestamoId)
        .then(prestamo => {
            res.status(200).json({
                message: "Préstamo obtenido exitosamente con id = " + prestamoId,
                prestamo: prestamo
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

exports.updateById = async (req, res) => {
    try {
        let prestamoId = req.params.id;
        let prestamo = await Prestamo.findByPk(prestamoId);

        if (!prestamo) {
            res.status(404).json({
                message: "No se encontró el préstamo con id = " + prestamoId,
                prestamo: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                numero_pedido: req.body.numero_pedido,
                codigo_libro: req.body.codigo_libro,
                codigo_usuario: req.body.codigo_usuario,
                fecha_salida: req.body.fecha_salida,
                fecha_maxima_devolver: req.body.fecha_maxima_devolver,
                fecha_devolucion: req.body.fecha_devolucion
            };
            let result = await Prestamo.update(updatedObject, { returning: true, where: { id: prestamoId } });
            
            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el préstamo con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Préstamo actualizado exitosamente con id = " + prestamoId,
                prestamo: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el préstamo con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let prestamoId = req.params.id;
        let prestamo = await Prestamo.findByPk(prestamoId);

        if (!prestamo) {
            res.status(404).json({
                message: "No existe el préstamo con id = " + prestamoId,
                error: "404",
            });
        } else {
            await prestamo.destroy();
            res.status(200).json({
                message: "Préstamo eliminado exitosamente con id = " + prestamoId,
                prestamo: prestamo,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el préstamo con id = " + req.params.id,
            error: error.message,
        });
    }
}
