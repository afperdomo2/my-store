const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

/**
 * express.json() es una función en Express que te permite analizar
 * y convertir datos JSON enviados a través de una solicitud HTTP en
 * un objeto JavaScript que puedes usar en tu aplicación.
 */
app.use(express.json());
routerApi(app);

app.listen(port, () => {
  console.info(`✅ Server express on: http://localhost:${port}`);
});
