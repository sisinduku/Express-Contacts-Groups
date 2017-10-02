function add_contactid_profiles_table(db) {
  let queryForeign = 'ALTER TABLE profiles ADD contact_id integer REFERENCES contacts(id) ON DELETE CASCADE';
  db.run(queryForeign, (err) => {
    if (err)
      console.log(err);
    else
      console.log(queryForeign);
  });
}
module.exports = add_contactid_profiles_table;
