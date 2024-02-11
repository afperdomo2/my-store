const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/models/index');

const { dbDialect, dbHost, dbPort, dbName } = config;

const user = encodeURIComponent(config.dbUser);
const password = encodeURIComponent(config.dbPassword);

const URI = `${dbDialect}://${user}:${password}@${dbHost}:${dbPort}/${dbName}`;

const sequelize = new Sequelize(URI, { dialect: dbDialect, logging: true });

setupModels(sequelize);
//sequelize.sync();

module.exports = sequelize;
