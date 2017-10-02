function unique_contactid_profiles_table(db) {
  let queryUnique = 'CREATE UNIQUE INDEX uniqueContact ON profiles (contact_id)';
  db.run(queryUnique, (err) => {
    if (err)
      console.log(err);
    else
      console.log(queryUnique);
  });
}
module.exports = unique_contactid_profiles_table;
