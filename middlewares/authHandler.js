const Boom = require('@hapi/boom');
const { config } = require('../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers.api;
  if (apiKey !== config.apiKey) {
    next(Boom.unauthorized());
  }
  next();
}

module.exports = { checkApiKey };
