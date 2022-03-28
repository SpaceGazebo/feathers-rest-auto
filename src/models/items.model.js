/* eslint-disable no-console */

// items-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  // const tableName = 'items';
  // db.schema.hasTable(tableName).then(exists => {
  //   if(!exists) {
  //     db.schema.createTable(tableName, table => {
  //       table.increments('id');
  //       table.string('text');
  //     })
  //       .then(() => console.log(`Created ${tableName} table`))
  //       .catch(e => console.error(`Error creating ${tableName} table`, e));
  //   }
  // });

  // idk why but this always returns false
  // (process.env.APP_TABLE || "items").split(',').map(input => {
  //   const [ tableName, schema ] = input.split('.');
  //   console.log({tableName, schema})
  //   db.schema.withSchema(schema || 'public').hasTable(tableName).then(exists => {
  //     console.log(`table ${input} exists: `, exists);
  //   });
  // });

  (process.env.APP_TABLE || "items").split(',').map(input => {
    // const [ tableName, schema ] = input.split('.');
    // console.log({tableName, schema})
    db.table(input).select(db.raw('COUNT(*) as count')).then(result => {
      console.log(`table ${input} exists: `, result[0]);
    }).catch(err => {
      console.log(`error reading table ${input}`);
      console.error(err.message);
    });
  });

  return db;
};
