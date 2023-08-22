const MONGOOSE = require("mongoose");

module.exports = () => {
  MONGOOSE.connect("mongodb://127.0.0.1:27017/NewApp")
    .then(() => {
      console.log("mongodb connected");
    })
    .catch((err) => {
      console.log("failed to connect: ", err);
    });

  require("../models/Login").LOGIN;
  require("../models/ChatMessage");
  require("../models/ChatGroup");
};
