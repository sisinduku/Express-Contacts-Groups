// const db = require('../setup');
//
// console.log("--", db);

function create_contacts_table(db) {
  let query = 'CREATE TABLE IF NOT EXISTS contacts (' +
    'id integer PRIMARY KEY AUTOINCREMENT,' +
    'name TEXT,' +
    'company TEXT,' +
    'telp_number TEXT,' +
    'email TEXT)';
  db.run(query, (err) => {
    if (err)
      console.log(err);
    else
      console.log(query);
  });
}

module.exports = create_contacts_table;
