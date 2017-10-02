var express = require('express')
var router = express.Router();
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
router.use(bodyParser.json());
const addressCtrl = require('../controllers/addressCtrl');

router.get('/', (req, res) => {
  addressCtrl.getAddresses(req, res);
});

router.post('/', (req, res) => {
  addressCtrl.postAddress(req, res);
});

router.get('/edit/:addressId', (req, res) => {
  addressCtrl.getAddress(req, res);
});

router.post('/edit/:addressId', (req, res) => {
  addressCtrl.editAddress(req, res);
});

router.get('/delete/:addressId', (req, res) => {
  addressCtrl.deleteAddress(req, res);
});

module.exports = router;
