// const db = require('../setup');
//
// console.log("--", db);

function create_groups_table(db) {
  let query = 'CREATE TABLE IF NOT EXISTS groups (' +
    'id integer PRIMARY KEY AUTOINCREMENT,' +
    'name_of_group TEXT)';
  db.run(query, (err) => {
    if (err)
      console.log(err);
    else
      console.log(query);
  });
}

module.exports = create_groups_table;
