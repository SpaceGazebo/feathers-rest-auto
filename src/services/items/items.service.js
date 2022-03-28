// Initializes the `items` service on path `/items`
const { Items } = require('./items.class');
const createModel = require('../../models/items.model');
const hooks = require('./items.hooks');

module.exports = function (app) {
  (process.env.APP_TABLE || "items").split(',').map(name => {
    console.log(`configuring service ${name}`);
    const options = {
      Model: createModel(app),
      paginate: app.get('paginate'),
      name,
    };

    // Initialize our service with any options it requires
    app.use(`/${name}`, new Items(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service(name);

    service.hooks(hooks);
  });
};
