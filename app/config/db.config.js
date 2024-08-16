

const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions:{
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  }
});

const db = {};


db.sequelize = sequelize;
db.sequelize = sequelize;
 
db.Libro = require('../models/libro.model.js')(sequelize, Sequelize);
db.Prestamo = require('../models/prestamo.model.js')(sequelize, Sequelize);
 module.exports = db;