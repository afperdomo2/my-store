const { models } = require('../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    return data;
  }

  async find() {
    return await models.User.findAll();
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return { id, changes };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
