var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

const create_addresses_table = require('./migration/create_addresses_table');
const create_contacts_table = require('./migration/create_contacts_table');
const create_groups_table = require('./migration/create_groups_table');
const create_profile_table = require('./migration/create_profile_table');
const create_contacts_groups_table = require('./migration/create_contacts_groups_table');
const add_contactid_profiles_table = require('./migration/add_contactid_profiles_table');
const unique_contactid_profiles_table = require('./migration/unique_contactid_profiles_table');
const add_contactid_addresses_table = require('./migration/add_contactid_addresses_table');
//
db.serialize(function() {
  create_addresses_table(db);
  create_contacts_table(db);
  create_groups_table(db);
  create_profile_table(db);
  create_contacts_groups_table(db);
  // add_contactid_profiles_table(db);
  // unique_contactid_profiles_table(db);
  // add_contactid_addresses_table(db);
});
//
db.close();

module.exports = db;
