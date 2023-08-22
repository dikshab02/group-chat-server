require('dotenv').config();

const EXPRESS = require("express"); //require the express.js
const APP = EXPRESS(); //start the express.js
const PORT = 3000;
var cors = require("cors");
APP.use(cors());
APP.use(EXPRESS.json());

require('./config/database.config')();
require('./routes/login.route')(APP);
require('./routes/create-chat-group.route')(APP);
require('./routes/chat-group-message.route')(APP);


APP.listen(PORT, () => {
  console.log("port connected");
});
