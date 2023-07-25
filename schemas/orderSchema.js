const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const state = Joi.string().min(3);

const getOrderSchema = Joi.object({
  id: id.required(),
});

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  state: state.required(),
});

const updateOrderSchema = Joi.object({
  state,
});

module.exports = {
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
};
