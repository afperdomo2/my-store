const express = require('express');
const UserService = require('./../services/userService');
const validatorHandler = require('./../middlewares/validatorHandler');
const { checkRoles } = require('../middlewares/authHandler');
const {
  updateUserSchema,
  createUserSchema,
  getUserSchema,
} = require('./../schemas/userSchema');
const passport = require('passport');

const router = express.Router();
const service = new UserService();

const checkAuthentication = passport.authenticate('jwt', { session: false });
const UPDATE_ROLES = ['admin'];
const CONSULT_ROLES = [...UPDATE_ROLES, 'seller', 'customer'];

router.get(
  '/',
  checkAuthentication,
  checkRoles(...CONSULT_ROLES),
  async (req, res, next) => {
    try {
      const users = await service.find();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  checkAuthentication,
  checkRoles(...CONSULT_ROLES),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  checkAuthentication,
  checkRoles(...UPDATE_ROLES),
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  checkAuthentication,
  checkRoles(...UPDATE_ROLES),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  checkAuthentication,
  checkRoles(...UPDATE_ROLES),
  validatorHandler(getUserSchema, 'params'),
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
