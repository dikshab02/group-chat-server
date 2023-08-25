const EXPRESS = require("express"); //require the express.js
const APP = EXPRESS(); //start the express.js
const cors = require("cors");
const PORT = 3000;
const session = require('express-session'); // to create session
const CONNECTMONGOSTORE = require('connect-mongo'); // to store the session even after server restart

APP.use(cors({
  origin: [
    "http://localhost:4200",
    "http://127.0.0.1:4200"
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"]
}));
APP.use(session({
  secret: 'diksha9693401411',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000, httpOnly: false },
  store: CONNECTMONGOSTORE.create({
    mongoUrl: "mongodb://127.0.0.1:27017/NewApp"
  })
}));
APP.use(EXPRESS.json());
APP.use(EXPRESS.urlencoded({ extended: true }));

require('./config/database.config')();
require('./routes/login.route')(APP);
require('./routes/logout.route')(APP);
require('./routes/create-chat-group.route')(APP);
require('./routes/chat-group-message.route')(APP);


APP.listen(PORT, () => {
  console.log("port connected");
});
