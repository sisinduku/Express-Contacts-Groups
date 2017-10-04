const Profile = require('../models/profile');
const Contact = require('../models/contact');

class ProfileCtrl {
  static getProfiles(req, res, err = null) {
    Profile.getProfiles()
      .then((rows) => {
        let contacts = rows.reduce((result, element) => {
          result.push(element.contact_id);
          return result;
        }, []);
        return {
          rows: rows,
          contacts: contacts
        };
      })
      .then(values => {
        Promise.all([
            Contact.getContactRows(values.contacts),
            Contact.getContacts(),
          ])
          .then(valuesAll => {
            let contactJoined = values.rows.map((element) => {
              valuesAll[0].forEach(value => {
                if (element.contact_id == value.id)
                  element['contact_name'] = value.name;
              });
              return element;
            });
            res.render('show_list_profile', {
              title: 'Show profiles',
              data: contactJoined,
              contactData: valuesAll[1],
              err: err,
              page: 'profile-nav',
            });
          })
          .catch(reason => {
            console.log(reason);
          })
      })
      .catch(reason => {
        console.log(reason);
      });
  }


  static getProfile(req, res) {
    Profile.getProfile(req.params)
      .then((row) => row)
      .then(row => {
        Promise.all([
            Contact.getContactRows([row.contact_id]),
            Contact.getContacts(),
          ])
          .then(values => {
            if (values[0].length > 0)
              row['contact_name'] = values[0][0].name;
            else
              row['contact_name'] = "";
            res.render('show_profile', {
              title: 'Show Profile',
              data: row,
              contactData: values[1],
              page: 'profile-nav',
            });
          })
          .catch(reason => {
            console.log(reason);
          })
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  static postProfile(req, res) {
    Profile.postProfile(req.body).then((val) => {
      res.redirect('/profiles');
    }).catch(reason => {
      this.getProfiles(req, res, reason);
    });
  }

  static editProfile(req, res) {
    Profile.editProfile(req.body).then((val) => {
      res.redirect('/profiles');
    }).catch(reason => {
      console.log(reason);
    });
  }

  static deleteProfile(req, res) {
    Profile.deleteProfile(req.params).then((val) => {
      res.redirect('/profiles');
    }).catch(reason => {
      console.log(reason);
    });
  }
}

module.exports = ProfileCtrl;
