const Boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class customerService {
  constructor() {}

  async create(data) {
    return await models.Customer.create(data);
  }

  async find() {
    return await models.Customer.findAll({
      include: ['user'],
    });
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw Boom.notFound('⚠️Customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    return await customer.update(changes);
  }

  async delete(id) {
    const customer = await this.findOne(id);
    return await customer.destroy();
  }
}

module.exports = customerService;
