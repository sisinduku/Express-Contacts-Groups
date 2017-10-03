const Group = require('../models/group');
const ContactGroup = require('../models/contactGroup');
const Contact = require('../models/contact');

class GroupCtrl {
  static getGroups(req, res) {
    Group.getGroups().then((rows) => {
      let groups = rows.reduce((result, element) => {
        result.push(element.id);
        return result;
      }, []);
      ContactGroup.getContactGroupByGroupId(groups).then(contactGroups => {
        let contactIdsJoined = rows.map((element) => {
          element['contact_id'] = [];
          contactGroups.forEach(value => {
            if (element.id == value.group_id) {
              element['contact_id'].push(value.contact_id);
            }
          });
          return element;
        });
        Contact.getContacts().then((contacts) => {
          let data = contactIdsJoined.map((list) => {
            list['contact'] = [];
            list.contact_id.forEach(listValue => {
              contacts.forEach(contactValue => {
                if (listValue == contactValue.id) {
                  list['contact'].push(contactValue);
                }
              });
            });
            return list;
          });
          res.render('show_list_group', {
            title: 'Show Groups',
            data: data,
            page: 'group-nav',
          });
        });
      });
    }).catch((reason) => {
      console.log(reason);
    });
  }

  static getGroup(req, res) {
    Group.getGroup(req.params).then((row) => {
      res.render('show_group', {
        title: 'Show Group',
        data: row,
        page: 'group-nav',
      });
    }).catch((reason) => {
      console.log(reason);
    });
  }

  static postGroup(req, res) {
    Group.postGroup(req.body).then((val) => {
      res.redirect('/groups');
    }).catch(reason => {
      console.log(reason);
    });
  }

  static editGroup(req, res) {
    Group.editGroup(req.body).then((val) => {
      res.redirect('/groups');
    }).catch(reason => {
      console.log(reason);
    });
  }

  static assignGroupForm(req, res) {
    Group.getGroup(req.params).then((row) => {
      Contact.getContacts().then((rows) => {
        res.render('assign_group', {
          title: 'Assign Group',
          data: row,
          contactData: rows,
          page: 'group-nav',
        });
      });
    }).catch((reason) => {
      console.log(reason);
    });
  }

  static assignGroup(req, res) {
    req.body['group_id'] = req.params.groupId;
    ContactGroup.postContactGroup(req.body).then((val) => {
      res.redirect('/groups');
    }).catch(reason => {
      console.log(reason);
    });
  }

  static deleteGroup(req, res) {
    Group.deleteGroup(req.params).then((val) => {
      res.redirect('/groups');
    }).catch(reason => {
      console.log(reason);
    });
  }
}

module.exports = GroupCtrl;
