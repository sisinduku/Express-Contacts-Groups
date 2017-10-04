const Address = require('../models/address');
const Contact = require('../models/contact');

class AddressCtrl {
  static getAddresses(req, res, err = null) {
    Address.getAddresses()
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
          .then((values2) => {
            let contactJoined = values.rows.map((element) => {
              values2[0].forEach(value => {
                if (element.contact_id == value.id)
                  element['contact_name'] = value.name;
              });
              return element;
            });
            res.render('show_list_address', {
              title: 'Show addresses',
              data: contactJoined,
              page: 'address-nav',
              contactData: values2[1],
              err: err,
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

  static getAddress(req, res) {
    Address.getAddress(req.params)
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
            res.render('show_address', {
              title: 'Show Address',
              data: row,
              page: 'address-nav',
              contactData: values[1],
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
