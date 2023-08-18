const express = require('express');
const CustomerService = require('./../services/customerService');
const validatorHandler = require('./../middlewares/validatorHandler');
const { checkRoles } = require('../middlewares/authHandler');
const {
  updateCustomerSchema,
  createCustomerSchema,
  getCustomerSchema,
} = require('./../schemas/customerSchema');
const passport = require('passport');

const router = express.Router();
const service = new CustomerService();

const checkAuthentication = passport.authenticate('jwt', { session: false });
const rolesUpdate = ['admin', 'seller'];
const rolesConsult = [...rolesUpdate, 'customer'];

router.get('/', async (req, res, next) => {
  try {
    const customers = await service.find();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  checkAuthentication,
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  checkAuthentication,
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const customer = await service.update(id, body);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  checkAuthentication,
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
