const MONGOOSE = require("mongoose");

// MONGOOSE.Promise = global.Promise;

module.exports = () => {
  MONGOOSE.connect('mongodb://127.0.0.1:27017/NewApp')
    .then(() => {
      console.log("mongodb connected");
    })
    .catch((err) => {
      console.log("failed to connect: ", err);
    });

//   let db = MONGOOSE.connection;

//   db.on("open", (err) => {
//     if (err) {
//       console.log("MongoDB connection error: ", err);
//       throw err;
//     }

//     console.log("MongoDB is ready!");
//   });


  require("../models/Login").LOGIN;
  require("../models/ChatMessage");
  require("../models/ChatGroup");
};
