var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

class ContactGroup {
  constructor(param) {
    this.id = param.id;
    this.contact_id = param.contact_id;
    this.group_id = param.group_id;
  }

  static getContactGroupByContactId(param) {
    return new Promise((resolve, reject) => {
      let selectQuery = 'SELECT * FROM contacts_groups WHERE contact_id IN (';
      param.forEach((element, index) => {
        selectQuery += +element;
        if (index !== param.length - 1) {
          selectQuery += ',';
        }
      });
      selectQuery += ')';
      db.all(selectQuery, (err, rows) => {
        if (!err) {
          let result = rows.map(rowContactGroup => {
            return new ContactGroup(rowContactGroup);
          });
          resolve(result);
        } else
          reject(err);
      });
    });
  }

  static getContactGroupByGroupId(param) {
    return new Promise((resolve, reject) => {
      let selectQuery = 'SELECT * FROM contacts_groups WHERE group_id IN (';
      param.forEach((element, index) => {
        selectQuery += +element;
        if (index !== param.length - 1) {
          selectQuery += ',';
        }
      });
      selectQuery += ')';
      db.all(selectQuery, (err, rows) => {
        if (!err) {
          let result = rows.map(rowContactGroup => {
            return new ContactGroup(rowContactGroup);
          });
          resolve(result);
        } else
          reject(err);
      });
    });
  }

  static postContactGroup(postData) {
    let insertQuery = "INSERT INTO contacts_groups (contact_id, group_id) VALUES (?, ?)";
    return new Promise((resolve, reject) => {
      db.run(insertQuery, [postData.contact_id, postData.group_id], (err) => {
        if (!err)
          resolve(insertQuery);
        else
          reject(err);
      });
    });
  }
}

module.exports = ContactGroup;
