var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Contact Groups',
    page: 'home',
  });
});

module.exports = router;
