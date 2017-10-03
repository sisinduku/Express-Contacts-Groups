var express = require('express')
var router = express.Router();

const profileCtrl = require('../controllers/profileCtrl');

router.get('/', (req, res) => {
  profileCtrl.getProfiles(req, res);
});

router.post('/', (req, res) => {
  profileCtrl.postProfile(req, res);
});

router.get('/edit/:profileId', (req, res) => {
  profileCtrl.getProfile(req, res);
});

router.post('/edit/:profileId', (req, res) => {
  profileCtrl.editProfile(req, res);
});

router.get('/delete/:profileId', (req, res) => {
  profileCtrl.deleteProfile(req, res);
});

module.exports = router;
