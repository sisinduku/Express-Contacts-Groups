var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

class Profile {
  getProfiles() {
    return new Promise((resolve, reject) => {
      let selectQuery = 'SELECT * FROM profiles';
      db.all(selectQuery, (err, rows) => {
        if (!err)
          resolve(rows);
        else
          reject(err);
      });
    });
  }

  getProfile(param) {
    return new Promise((resolve, reject) => {
      let selectQuery = 'SELECT * FROM profiles WHERE id = $id';
      db.get(selectQuery, {
        $id: param.profileId,
      }, (err, row) => {
        if (!err)
          resolve(row);
        else
          reject(err);
      });
    });
  }

  postProfile(postData) {
    let insertQuery = "INSERT INTO profiles (username, password, contact_id) VALUES (?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.run(insertQuery, [postData.username, postData.password, postData.contact], (err) => {
        if (!err)
          resolve(insertQuery);
        else
          reject(err);
      });
    });
  }

  editProfile(postData) {
    let updateQuery = "UPDATE profiles SET username = $username, password = $password, " +
      "contact_id = $contact WHERE id = $id";
    return new Promise((resolve, reject) => {
      db.run(updateQuery, {
        $username: postData.username,
        $password: postData.password,
        $contact_id: postData.contact,
        $id: postData.id,
      }, err => {
        if (!err)
          resolve(updateQuery);
        else
          reject(err);
      });
    });
  }

  deleteProfile(param) {
    let deleteQuery = "DELETE FROM profiles WHERE id = $id";
    return new Promise((resolve, reject) => {
      db.run(deleteQuery, {
        $id: param.profileId,
      }, err => {
        if (!err)
          resolve(deleteQuery);
        else
          reject(err);
      });
    });
  }
}

module.exports = Profile;
