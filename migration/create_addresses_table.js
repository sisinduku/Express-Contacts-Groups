// const db = require('../setup');
//
// console.log("--", db);

function create_addresses_table(db) {
  let query = 'CREATE TABLE IF NOT EXISTS addresses (' +
    'id integer PRIMARY KEY AUTOINCREMENT,' +
    'street TEXT,' +
    'city TEXT,' +
    'zipcode TEXT)';
  db.run(query, (err) => {
    if (err)
      console.log(err);
    else
      console.log(query);
  });
}

module.exports = create_addresses_table;
