const EXPRESS = require("express"); //require the express.js
const APP = EXPRESS(); //start the express.js
const cors = require("cors");
const PORT = 3000;
const session = require('express-session')

APP.use(cors());
APP.use(session({
  secret: 'diksha9693401411',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000, httpOnly: false }
}));
APP.use(EXPRESS.json());
APP.use(EXPRESS.urlencoded({ extended: true }));

require('./config/database.config')();
require('./routes/login.route')(APP);
require('./routes/create-chat-group.route')(APP);
require('./routes/chat-group-message.route')(APP);


APP.listen(PORT, () => {
  console.log("port connected");
});
