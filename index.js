const app = require('./app');
const { config } = require('./config/config');

const { port } = config;

app.listen(port, () => {
  console.info(`✅ Server express on: http://localhost:${port}`);
});
