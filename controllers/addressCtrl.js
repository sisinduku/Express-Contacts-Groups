const Address = require('../models/address');
const Contact = require('../models/contact');

class AddressCtrl {
  static getAddresses(req, res, err = null) {
    Address.getAddresses().then((rows) => {
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
          res.render('show_list_address', {
            title: 'Show addresses',
            data: contactJoined,
            page: 'address-nav',
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

  static getAddress(req, res) {
    Address.getAddress(req.params).then((row) => {
      Contact.getContactRows([row.contact_id]).then((rowContact) => {
        if (rowContact.length > 0)
          row['contact_name'] = rowContact[0].name;
        else
          row['contact_name'] = "";
        Contact.getContacts().then((allContacts) => {
          res.render('show_address', {
            title: 'Show Address',
            data: row,
            page: 'address-nav',
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

  static postAddress(req, res) {
    Address.postAddress(req.body).then((val) => {
      res.redirect('/addresses');
    }).catch(reason => {
      console.log(reason);
    });
  }

  static editAddress(req, res) {
    Address.editAddress(req.body).then((val) => {
      res.redirect('/addresses');
    }).catch(reason => {
      console.log(reason);
    });
  }

  static deleteAddress(req, res) {
    Address.deleteAddress(req.params).then((val) => {
      res.redirect('/addresses');
    }).catch(reason => {
      console.log(reason);
    });
  }
}

module.exports = AddressCtrl;
