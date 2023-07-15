const { Sequelize } = require('sequelize');
const { config } = require('../config/config');

const { dbHost: HOST, dbPort: PORT, dbName: NAME } = config;
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const URI = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${NAME}`;

const sequelize = new Sequelize(URI, { dialect: 'postgres', logging: true });

module.exports = sequelize;
