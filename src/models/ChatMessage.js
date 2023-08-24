const MONGOOSE = require("mongoose");
const { loginSchema } = require("./Login");
const STRING = MONGOOSE.Schema.Types.String;
const DATE = MONGOOSE.Schema.Types.Date;

const chatMessageSchema = new MONGOOSE.Schema({
  chatGrpId: {
    type: STRING,
    required: true,
  },
  user: {
    type: loginSchema,
    required: true,
  },
  time: {
    type: DATE,
    default: Date.now,
    required: true,
  },
  message: {
    type: STRING,
    required: true,
  },
  likedByUsers: [{
    type: STRING
  }]
});

const CHATMESSAGE = new MONGOOSE.model(
  "chatMessageCollection",
  chatMessageSchema
);
module.exports = CHATMESSAGE;
