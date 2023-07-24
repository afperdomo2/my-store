const Boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ProductService {
  constructor() {}

  async create(data) {
    return await models.Product.create(data);
  }

  async find() {
    return await models.Product.findAll({
      include: ['category'],
    });
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category'],
    });
    if (!product) {
      throw Boom.notFound('⚠️Product not found');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    return await product.update(changes);
  }

  async delete(id) {
    const product = await this.findOne(id);
    return await product.destroy();
  }
}

module.exports = ProductService;
