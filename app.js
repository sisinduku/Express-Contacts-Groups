const express = require('express');
const index = require('./routes/indexRoute');
const contact = require('./routes/contactRoute');
const group = require('./routes/groupRoute');
const profile = require('./routes/profileRoute');
const address = require('./routes/addressRoute');
const bodyParser = require('body-parser');

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
app.use(bodyParser.json());


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/assets'));

// use router
app.use('/', index);
app.use('/contacts', contact);
app.use('/groups', group);
app.use('/profiles', profile);
app.use('/addresses', address);


app.listen(3000, () => {
  console.log('App is running on port 3000');
});
