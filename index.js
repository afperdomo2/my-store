const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const path = require('path');

const {
  logErrors,
  boomErrorHandler,
  errorHandler,
} = require('./middlewares/errorHandler');

const app = express();
const PORT = 3000;
const STATIC_PORT = 4000;

// STATIC FILES
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

/**
 * express.json() es una función en Express que te permite analizar
 * y convertir datos JSON enviados a través de una solicitud HTTP en
 * un objeto JavaScript que puedes usar en tu aplicación.
 */
app.use(express.json());

// CORS
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

// ROUTES
routerApi(app);

/**
 * MIDDLEWARES
 * Es importante tener en cuenta el orden de ejecución
 */
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.info(`✅ Server express on: http://localhost:${PORT}`);
});

app.listen(STATIC_PORT, () => {
  console.log(`✅ Static Dir on: http://localhost:${STATIC_PORT}`);
});
