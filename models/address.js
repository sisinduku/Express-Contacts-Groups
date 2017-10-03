var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

class Address {
  constructor(param) {
    this.id = param.id;
    this.street = param.street;
    this.city = param.city;
    this.zipcode = param.zipcode;
    this.contact_id = param.contact_id;
  }

  static getAddresses() {
    return new Promise((resolve, reject) => {
      let selectQuery = 'SELECT * FROM addresses';
      db.all(selectQuery, (err, rows) => {
        if (!err) {
          let result = rows.map(rowAddress => {
            return new Address(rowAddress);
          });
          resolve(result);
        } else
          reject(err);
      });
    });
  }

  static getAddress(param) {
    return new Promise((resolve, reject) => {
      let selectQuery = 'SELECT * FROM addresses WHERE id = $id';
      db.get(selectQuery, {
        $id: param.addressId,
      }, (err, row) => {
        if (!err)
          resolve(new Address(row));
        else
          reject(err);
      });
    });
  }

  static getAddressByContactId(param) {
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

  static postAddress(postData) {
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

  static editAddress(postData) {
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

  static deleteAddress(param) {
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
