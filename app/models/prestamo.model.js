module.exports = (sequelize, Sequelize) => {
    const Prestamo = sequelize.define('prestamo', {  
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        numero_pedido: {
            type: Sequelize.INTEGER
        },
        codigo_libro: {
            type: Sequelize.INTEGER
        },
        codigo_usuario: {
            type: Sequelize.INTEGER
        },
        fecha_salida: {
            type: Sequelize.DATE
        },
        fecha_maxima_devolver: {
            type: Sequelize.DATE
        },
        fecha_devolucion: {
            type: Sequelize.DATE
        }
    });

    return Prestamo;
};
