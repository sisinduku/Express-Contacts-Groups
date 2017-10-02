var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

class Contact {
  getContacts() {
    return new Promise((resolve, reject) => {
      let selectQuery = 'SELECT * FROM contacts';
      db.all(selectQuery, (err, rows) => {
        if (!err)
          resolve(rows);
        else
          reject(err);
      });
    });
  }

  getContactRows(param) {
    return new Promise((resolve, reject) => {
      let selectQuery = 'SELECT * FROM contacts WHERE id IN (';
      param.forEach((element, index) => {
        selectQuery += +element;
        if (index !== param.length - 1) {
          selectQuery += ',';
        }
      });
      selectQuery += ')';
      db.all(selectQuery, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else
          reject(err);
      });
    });
  }

  getContact(param) {
    return new Promise((resolve, reject) => {
      let selectQuery = 'SELECT * FROM contacts WHERE id = $id';
      db.get(selectQuery, {
        $id: param.contactId,
      }, (err, row) => {
        if (!err)
          resolve(row);
        else
          reject(err);
      });
    });
  }

  postContact(postData) {
    let insertQuery = "INSERT INTO contacts (name, company, telp_number," +
      "email) VALUES (?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.run(insertQuery, [postData.name, postData.company, postData.telp_number,
        postData.email
      ], (err) => {
        if (!err)
          resolve(insertQuery);
        else
          reject(err);
      });
    });
  }

  editContact(postData) {
    let updateQuery = "UPDATE contacts SET name = $name, company = $company, " +
      "telp_number = $telp_number, email = $email WHERE id = $id";
    return new Promise((resolve, reject) => {
      db.run(updateQuery, {
        $name: postData.name,
        $company: postData.company,
        $telp_number: postData.telp_number,
        $email: postData.email,
        $id: postData.id
      }, err => {
        if (!err)
          resolve(updateQuery);
        else
          reject(err);
      });
    });
  }

  deleteContact(param) {
    let deleteQuery = "DELETE FROM contacts WHERE id = $id";
    return new Promise((resolve, reject) => {
      db.run(deleteQuery, {
        $id: param.contactId,
      }, err => {
        if (!err)
          resolve(deleteQuery);
        else
          reject(err);
      });
    });
  }
}

module.exports = Contact;
