const MONGOOSE = require("mongoose");
const { loginSchema } = require("./Login");
const chatMessageSchema = new MONGOOSE.Schema({
  chatGrpId: {
    type: String,
    required: true,
  },
  user: {
    type: loginSchema,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const CHATMESSAGE = new MONGOOSE.model(
  "chatMessageCollection",
  chatMessageSchema
);
module.exports = CHATMESSAGE;
