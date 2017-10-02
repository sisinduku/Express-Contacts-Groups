var express = require('express')
var router = express.Router();
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
router.use(bodyParser.json());
const groupCtrl = require('../controllers/groupCtrl');

router.get('/', (req, res) => {
  groupCtrl.getGroups(req, res);
});

router.post('/', (req, res) => {
  groupCtrl.postGroup(req, res);
});

router.get('/edit/:groupId', (req, res) => {
  groupCtrl.getGroup(req, res);
});

router.post('/edit/:groupId', (req, res) => {
  groupCtrl.editGroup(req, res);
});

router.get('/assign/:groupId', (req, res) => {
  groupCtrl.assignGroupForm(req, res);
});

router.post('/assign/:groupId', (req, res) => {
  groupCtrl.assignGroup(req, res);
});

router.get('/delete/:groupId', (req, res) => {
  groupCtrl.deleteGroup(req, res);
});

module.exports = router;
