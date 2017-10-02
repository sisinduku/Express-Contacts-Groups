function add_contactid_addresses_table(db) {
  let queryForeign = 'ALTER TABLE addresses ADD contact_id integer REFERENCES contacts(id) ON DELETE CASCADE';
  db.run(queryForeign, (err) => {
    if (err)
      console.log(err);
    else
      console.log(queryForeign);
  });
}
module.exports = add_contactid_addresses_table;
