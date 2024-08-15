
let express = require('express');
let router = express.Router();
const libros = require('../controllers/libro.controller.js');
router.post('/api/libros/create', libros.create);
router.get('/api/libros/all', libros.retrieveAllLibros);
router.get('/api/libros/onebycodigo/:codigo', libros.getLibroByCodigo);
router.put('/api/libros/update/:codigo', libros.updateByCodigo);
router.delete('/api/libros/delete/:codigo', libros.deleteByCodigo);


module.exports = router;