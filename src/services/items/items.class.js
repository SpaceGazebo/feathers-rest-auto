const { Service } = require('feathers-knex');

exports.Items = class Items extends Service {
  constructor(options) {
    super({
      ...options,
    });
  }
};
