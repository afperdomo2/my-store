const express = require('express');

const ProductService = require('../services/productService');
const validatorHandler = require('../middlewares/validatorHandler');
const { checkRoles } = require('../middlewares/authHandler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} = require('../schemas/productSchema');
const passport = require('passport');

const router = express.Router();
const service = new ProductService();

const checkAuthentication = passport.authenticate('jwt', { session: false });
const UPDATE_ROLES = ['admin', 'seller'];
const CONSULT_ROLES = [...UPDATE_ROLES, 'customer'];

// POST
router.post(
  '/',
  checkAuthentication,
  checkRoles(...UPDATE_ROLES),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

// PATCH - Se usa para parchar o actualizar parcialmente el recurso
router.patch(
  '/:id',
  checkAuthentication,
  checkRoles(...UPDATE_ROLES),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.status(200).json(product);
    } catch (error) {
      // EL next ejecuta el middleware
      next(error);
    }
  }
);

// DELETE
router.delete(
  '/:id',
  checkAuthentication,
  checkRoles(...UPDATE_ROLES),
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      /**
       * En PUT, PATCH y DELETE, también se puede usar el status 204, que
       * indica que el servidor ha completado exitosamente la solicitud y
       * no hay contenido para enviar en el cuerpo de la respuesta
       */
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
);

// GET
router.get(
  '/',
  checkAuthentication,
  checkRoles(...CONSULT_ROLES),
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  checkAuthentication,
  checkRoles(...CONSULT_ROLES),
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
