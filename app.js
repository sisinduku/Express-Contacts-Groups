const express = require('express');
const contact = require('./routers/contactRoute');
const group = require('./routers/groupRoute');
const profile = require('./routers/profileRoute');
const address = require('./routers/addressRoute');

const app = express();


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/assets'));

// use router
app.use('/contacts', contact);
app.use('/groups', group);
app.use('/profiles', profile);
app.use('/addresses', address);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Contact Groups',
  });
});

app.listen(3000, () => {
  console.log('App is running on port 3000');
});
