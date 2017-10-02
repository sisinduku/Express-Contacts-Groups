const Profile = require('../models/profile');
const Contact = require('../models/contact');
const profile = new Profile();
const contact = new Contact();

class ProfileCtrl {
  static getProfiles(req, res, err = null) {
    profile.getProfiles().then((rows) => {
      let contacts = rows.reduce((result, element) => {
        result.push(element.contact_id);
        return result;
      }, []);
      contact.getContactRows(contacts).then((rowsContact) => {
        let contactJoined = rows.map((element) => {
          rowsContact.forEach(value => {
            if (element.contact_id == value.id)
              element['contact_name'] = value.name;
          });
          return element;
        });
        contact.getContacts().then((allContacts) => {
          res.render('show_list_profile', {
            title: 'Show profiles',
            data: contactJoined,
            contactData: allContacts,
            err: err,
          });
        }).catch((reason) => {
          console.log(reason);
        });
      }).catch(reason => {
        console.log(reason);
      });
    }).catch((reason) => {
      console.log(reason);
    });
  }

  static getProfile(req, res) {
    profile.getProfile(req.params).then((row) => {
      contact.getContactRows([row.contact_id]).then((rowContact) => {
        if (rowContact.length > 0)
          row['contact_name'] = rowContact[0].name;
        else
          row['contact_name'] = "";
        contact.getContacts().then((allContacts) => {
          res.render('show_profile', {
            title: 'Show profile',
            data: row,
            contactData: allContacts,
          });
        }).catch((reason) => {
          console.log(reason);
        });
      }).catch(reason => {
        console.log(reason);
      });
    }).catch((reason) => {
      console.log(reason);
    });
  }

  static postProfile(req, res) {
    profile.postProfile(req.body).then((val) => {
      res.redirect('/profiles');
    }).catch(reason => {
      this.getProfiles(req, res, reason);
    });
  }

  static editProfile(req, res) {
    profile.editProfile(req.body).then((val) => {
      res.redirect('/profiles');
    }).catch(reason => {
      console.log(reason);
    });
  }

  static deleteProfile(req, res) {
    profile.deleteProfile(req.params).then((val) => {
      res.redirect('/profiles');
    }).catch(reason => {
      console.log(reason);
    });
  }
}

module.exports = ProfileCtrl;
