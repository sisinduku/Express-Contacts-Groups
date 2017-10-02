var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

class Address {
  getAddresses() {
    return new Promise((resolve, reject) => {
      let selectQuery = 'SELECT * FROM addresses';
      db.all(selectQuery, (err, rows) => {
        if (!err)
          resolve(rows);
        else
          reject(err);
      });
    });
  }

  getAddress(param) {
    return new Promise((resolve, reject) => {
      let selectQuery = 'SELECT * FROM addresses WHERE id = $id';
      db.get(selectQuery, {
        $id: param.addressId,
      }, (err, row) => {
        if (!err)
          resolve(row);
        else
          reject(err);
      });
    });
  }

  getAddressByContactId(param) {
    return new Promise((resolve, reject) => {
      let selectQuery = 'SELECT * FROM addresses WHERE contact_id = $id';
      db.all(selectQuery, {
        $id: param.contactId,
      }, (err, row) => {
        if (!err)
          resolve(row);
        else
          reject(err);
      });
    });
  }

  postAddress(postData) {
    let insertQuery = "INSERT INTO addresses (street, city, zipcode, contact_id) VALUES (?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.run(insertQuery, [postData.street, postData.city, postData.zipcode, postData.contact], (err) => {
        if (!err)
          resolve(insertQuery);
        else
          reject(err);
      });
    });
  }

  editAddress(postData) {
    let updateQuery = "UPDATE addresses SET street = $street, city = $city, " +
      "zipcode = $zipcode, contact_id = $contact WHERE id = $id";
    return new Promise((resolve, reject) => {
      db.run(updateQuery, {
        $street: postData.street,
        $city: postData.city,
        $zipcode: postData.zipcode,
        $contact: postData.contact,
        $id: postData.id,
      }, err => {
        if (!err)
          resolve(updateQuery);
        else
          reject(err);
      });
    });
  }

  deleteAddress(param) {
    let deleteQuery = "DELETE FROM addresses WHERE id = $id";
    return new Promise((resolve, reject) => {
      db.run(deleteQuery, {
        $id: param.addressId,
      }, err => {
        if (!err)
          resolve(deleteQuery);
        else
          reject(err);
      });
    });
  }
}

module.exports = Address;
