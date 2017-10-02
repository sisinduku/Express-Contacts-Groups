var express = require('express')
var router = express.Router();
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
router.use(bodyParser.json());
const ContactCtrl = require('../controllers/contactCtrl');

router.get('/', (req, res) => {
  ContactCtrl.getContacts(req, res);
});

router.post('/', (req, res) => {
  ContactCtrl.postContact(req, res);
});

router.get('/edit/:contactId', (req, res) => {
  ContactCtrl.getContact(req, res);
});

router.post('/edit/:contactId', (req, res) => {
  ContactCtrl.editContact(req, res);
});

router.get('/address/:contactId', (req, res) => {
  ContactCtrl.getAddress(req, res);
});

router.post('/address/:contactId', (req, res) => {
  ContactCtrl.updateAddress(req, res);
});

router.get('/delete/:contactId', (req, res) => {
  ContactCtrl.deleteContact(req, res);
});

module.exports = router;
