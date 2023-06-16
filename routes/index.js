const express = require('express');

const categoriesRouter = require('./categoriesRouter');
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');

const routerApi = (app) => {
  const router = express.Router();
  // Agrega versionamiento a las rutas
  app.use('/api/v1/', router);
  router.use('/categories', categoriesRouter);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
};

module.exports = routerApi;
