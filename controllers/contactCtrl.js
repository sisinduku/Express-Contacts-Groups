const Contact = require('../models/contact');
const Address = require('../models/address');
const ContactGroup = require('../models/contactGroup');
const Group = require('../models/group');

class ContactCtrl {
  static getContacts(req, res) {
    // Ambil semua kontak & array of id semua kontak
    Contact.getContacts()
      .then((rows) => {
        let contacts = rows.reduce((result, element) => {
          result.push(element.id);
          return result;
        }, []);
        return {
          contacts: contacts,
          rows: rows,
        };
      })
      // Lalu
      .then((result) => {
        Promise.all([
            ContactGroup.getContactGroupByContactId(result.contacts),
            Group.getGroups(),
          ])
          .then(values => {
            let groupIdsJoined = result.rows.map((element) => {
              element['group_id'] = [];
              values[0].forEach(value => {
                if (element.id == value.contact_id) {
                  element['group_id'].push(value.group_id);
                }
              });
              return element;
            });
            let data = groupIdsJoined.map((list) => {
              list['group'] = [];
              list.group_id.forEach(listValue => {
                values[1].forEach(groupValue => {
                  if (listValue == groupValue.id) {
                    list['group'].push(groupValue.name_of_group);
                  }
                });
              });
              return list;
            });
            res.render('show_list_contact', {
              title: 'Show Contacts',
              data: result.rows,
              page: 'contact-nav',
              groups: values[1],
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

  static getContact(req, res) {
    Contact.getContact(req.params)
      .then((row) => {
        res.render('show_contact', {
          title: 'Show Contact',
          data: row,
          page: 'contact-nav',
        });
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  static postContact(req, res) {
    Contact.postContact(req.body)
      .then(val => val)
      .then(val => {
        ContactGroup.postContactGroup({
            contact_id: val,
            group_id: req.body.group_id,
          })
          .then((val2) => {
            res.redirect('/contacts');
          })
          .catch(reason => {
            console.log(reason);
          });
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  static editContact(req, res) {
    Contact.editContact(req.body)
      .then((val) => {
        res.redirect('/contacts');
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  static getAddress(req, res) {
    Promise.all([
        Address.getAddressByContactId(req.params),
        Contact.getContact(req.params),
      ])
      .then(values => {
        res.render('show_contact_address', {
          title: 'Show Contact Address',
          contact: values[1],
          data: values[0],
          page: 'contact-nav',
        });
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  static updateAddress(req, res) {
    req.body['contact'] = req.params.contactId;
    Address.postAddress(req.body)
      .then((val) => {
        this.getAddress(req, res);
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  static deleteContact(req, res) {
    Contact.deleteContact(req.params)
      .then((val) => {
        res.redirect('/contacts');
      })
      .catch(reason => {
        console.log(reason);
      });
  }
}

module.exports = ContactCtrl;
