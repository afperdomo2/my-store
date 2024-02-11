const express = require('express');
const cors = require('cors');
const path = require('path');

const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/authHandler');
const {
  logErrors,
  boomErrorHandler,
  errorHandler,
  ormErrorHandler,
} = require('./middlewares/errorHandler');

const app = express();

// Static files
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

/**
 * express.json() es una función en Express que te permite analizar
 * y convertir datos JSON enviados a través de una solicitud HTTP en
 * un objeto JavaScript que puedes usar en tu aplicación.
 */
app.use(express.json());

// Cors
const whiteList = ['http://localhost:8080', 'http://localhost:4000'];
const options = {
  origin: (origin, callback) => {
    if (!whiteList.includes(origin) && origin) {
      callback(new Error('Acceso no permitido'));
    }
    callback(null, true);
  },
};
app.use(cors(options));
require('./utils/auth');

// Routes
app.get('/nueva-ruta', checkApiKey, (req, res) => {
  res.send('Hola, soy una nueva ruta');
});
routerApi(app);

/**
 * Middleware
 * Es importante tener en cuenta el orden de ejecución
 */
app.use(logErrors);
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.use(errorHandler);

module.exports = app;
