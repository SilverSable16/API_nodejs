
let express = require('express');
let router = express.Router();
const libros = require('../controllers/libro.controller.js');
router.post('/api/libros/create', libros.create);
router.get('/api/libros/all', libros.retrieveAllLibros);
router.get('/api/libros/onebycodigo/:codigo', libros.getLibroByCodigo);
router.put('/api/libros/update/:codigo', libros.updateByCodigo);
router.delete('/api/libros/delete/:codigo', libros.deleteByCodigo);

const prestamos = require('../controllers/prestamo.controller.js');
router.post('/api/prestamos/create', prestamos.create);
router.get('/api/prestamos/all', prestamos.retrieveAllPrestamos);
router.get('/api/prestamos/onebyid/:id', prestamos.getPrestamoById);
router.put('/api/prestamos/update/:id', prestamos.updateById);
router.delete('/api/prestamos/delete/:id', prestamos.deleteById);

module.exports = router;