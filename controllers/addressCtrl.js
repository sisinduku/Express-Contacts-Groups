const Address = require('../models/address');
const Contact = require('../models/contact');
const address = new Address();
const contact = new Contact();

class AddressCtrl {
  static getAddresses(req, res, err = null) {
    address.getAddresses().then((rows) => {
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
          res.render('show_list_address', {
            title: 'Show addresses',
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

  static getAddress(req, res) {
    address.getAddress(req.params).then((row) => {
      contact.getContactRows([row.contact_id]).then((rowContact) => {
        if (rowContact.length > 0)
          row['contact_name'] = rowContact[0].name;
        else
          row['contact_name'] = "";
        contact.getContacts().then((allContacts) => {
          res.render('show_address', {
            title: 'Show address',
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

  static postAddress(req, res) {
    address.postAddress(req.body).then((val) => {
      res.redirect('/addresses');
    }).catch(reason => {
      console.log(reason);
    });
  }

  static editAddress(req, res) {
    address.editAddress(req.body).then((val) => {
      res.redirect('/addresses');
    }).catch(reason => {
      console.log(reason);
    });
  }

  static deleteAddress(req, res) {
    address.deleteAddress(req.params).then((val) => {
      res.redirect('/addresses');
    }).catch(reason => {
      console.log(reason);
    });
  }
}

module.exports = AddressCtrl;
