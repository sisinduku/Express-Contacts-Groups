// const db = require('../setup');
//
// console.log("--", db);

function create_profile_table(db) {
  let query = 'CREATE TABLE IF NOT EXISTS profiles (' +
    'id integer PRIMARY KEY AUTOINCREMENT,' +
    'username TEXT,' +
    'password TEXT)';
  db.run(query, (err) => {
    if (err)
      console.log(err);
    else
      console.log(query);
  });
}

module.exports = create_profile_table;
