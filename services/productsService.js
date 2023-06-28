const { faker } = require('@faker-js/faker');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 600);
    });
  }

  async findOne(id) {
    return this.products.find((p) => p.id === parseInt(id));
  }

  async update(id, changes) {
    const index = this.products.findIndex((p) => p.id === parseInt(id));
    if (index === -1) {
      throw new Error('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((p) => p.id === parseInt(id));
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);
    return id;
  }

  generate() {
    for (let index = 0; index < 100; index++) {
      this.products.push({
        id: index + 1,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
      });
    }
  }
}

module.exports = ProductsService;
