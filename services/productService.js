const { faker } = require('@faker-js/faker');
const Boom = require('@hapi/boom');
const pool = require('../libs/postgresPool');

class ProductService {
  constructor() {
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
      isBlock: false,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    const rta = await this.pool.query('SELECT * FROM tasks');
    return rta.rows;
  }

  async findOne(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw Boom.notFound('⚠️Product not found');
    }
    const product = this.products[index];
    if (product.isBlock) {
      throw Boom.conflict('🔒Product is Block');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw Boom.notFound('⚠️Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw Boom.notFound('⚠️Product not found');
    }
    this.products.splice(index, 1);
    return id;
  }

  generate() {
    for (let i = 0; i < 100; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }
}

module.exports = ProductService;
