const express = require('express');
const OrderService = require('./../services/orderService');
const validatorHandler = require('./../middlewares/validatorHandler');
const { checkRoles } = require('../middlewares/authHandler');
const {
  updateOrderSchema,
  createOrderSchema,
  getOrderSchema,
  addItemSchema,
} = require('./../schemas/orderSchema');
const passport = require('passport');

const router = express.Router();
const service = new OrderService();

const checkAuthentication = passport.authenticate('jwt', { session: false });
const UPDATE_ROLES = ['admin', 'seller'];
const CONSULT_ROLES = [...UPDATE_ROLES, 'customer'];

router.get(
  '/',
  checkAuthentication,
  checkRoles(...CONSULT_ROLES),
  async (req, res, next) => {
    try {
      const orders = await service.find();
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  checkAuthentication,
  checkRoles(...CONSULT_ROLES),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  checkAuthentication,
  checkRoles(...UPDATE_ROLES),
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  checkAuthentication,
  checkRoles(...UPDATE_ROLES),
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const order = await service.update(id, body);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  checkAuthentication,
  checkRoles(...UPDATE_ROLES),
  validatorHandler(getOrderSchema, 'params'),
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

router.post(
  '/add-item',
  checkAuthentication,
  checkRoles(...UPDATE_ROLES),
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
