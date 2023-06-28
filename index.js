const express = require('express');
const routerApi = require('./routes');

const {
  logErrors,
  boomErrorHandler,
  errorHandler,
} = require('./middlewares/errorHandler');

const app = express();
const port = 3000;

/**
 * express.json() es una función en Express que te permite analizar
 * y convertir datos JSON enviados a través de una solicitud HTTP en
 * un objeto JavaScript que puedes usar en tu aplicación.
 */
app.use(express.json());
routerApi(app);

/**
 * Ejecución de los middlewares
 * Es importante tener en cuenta el orden de ejecución
 */
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.info(`✅ Server express on: http://localhost:${port}`);
});
