// const db = require('../setup');
//
// console.log("--", db);

function create_contacts_groups_table(db) {
  let query = 'CREATE TABLE IF NOT EXISTS contacts_groups (' +
    'id integer PRIMARY KEY AUTOINCREMENT, ' +
    'contact_id integer, ' +
    'group_id integer, ' +
    'FOREIGN KEY(contact_id) REFERENCES contacts(id) ON DELETE CASCADE, ' +
    'FOREIGN KEY(group_id) REFERENCES groups(id) ON DELETE CASCADE)';
  db.run(query, (err) => {
    if (err)
      console.log(err);
    else
      console.log(query);
  });
}

module.exports = create_contacts_groups_table;
