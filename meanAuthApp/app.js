const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// mongoose.createConnection(config.database, () => {
//     console.log('Connected to database: ' + config.database);
// });

//connect to mongodb
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to database: ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});


const app = express();
const users = require('./routes/users');
const port = 3000;

//cors allows requests to API from different domain name
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Index route
app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});

app.listen(port, () => {
    console.log('Server started on port: ' + port)
});