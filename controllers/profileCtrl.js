const Profile = require('../models/profile');
const Contact = require('../models/contact');

class ProfileCtrl {
  static getProfiles(req, res, err = null) {
    Profile.getProfiles().then((rows) => {
      let contacts = rows.reduce((result, element) => {
        result.push(element.contact_id);
        return result;
      }, []);
      Contact.getContactRows(contacts).then((rowsContact) => {
        let contactJoined = rows.map((element) => {
          rowsContact.forEach(value => {
            if (element.contact_id == value.id)
              element['contact_name'] = value.name;
          });
          return element;
        });
        Contact.getContacts().then((allContacts) => {
          res.render('show_list_profile', {
            title: 'Show profiles',
            data: contactJoined,
            contactData: allContacts,
            err: err,
            page: 'group-nav',
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
    Profile.getProfile(req.params).then((row) => {
      Contact.getContactRows([row.contact_id]).then((rowContact) => {
        if (rowContact.length > 0)
          row['contact_name'] = rowContact[0].name;
        else
          row['contact_name'] = "";
        Contact.getContacts().then((allContacts) => {
          res.render('show_profile', {
            title: 'Show Profile',
            data: row,
            contactData: allContacts,
            page: 'group-nav',
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
