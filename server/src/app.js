const env = require('./config');

const express = require('express');
var cookieParser = require('cookie-parser')

// configure Express app and install the JSON middleware for parsing JSON bodies
const app = express();
const cors = require('cors');

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// use routes
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/authorization-code/callback', require('./routes/auth-callback'));
app.use('/user', require('./routes/user'));

// start server
const SERVER_PORT = 9000;

app.listen(SERVER_PORT, () => console.log(`SaaS Template services listening on port ${SERVER_PORT}.`));
