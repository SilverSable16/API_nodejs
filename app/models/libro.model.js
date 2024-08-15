module.exports = (sequelize, Sequelize) => {
    const Libro = sequelize.define('libro', {  
        codigo: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        editorial: {
            type: Sequelize.STRING
        },
        autor: {
            type: Sequelize.STRING
        },
        genero: {
            type: Sequelize.STRING
        },
        paisAutor: {
            type: Sequelize.STRING
        },
        numeroPaginas: {
            type: Sequelize.INTEGER
        },
        añoEdicion: {
            type: Sequelize.INTEGER
        },
        precio: {
            type: Sequelize.FLOAT
        }
    });

    return Libro;
};
