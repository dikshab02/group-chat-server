const MONGOOSE = require("mongoose");
const { loginSchema } = require("./Login");
const chatGroupSchema = new MONGOOSE.Schema({
  name: {
    type: String,
    required: true,
  },
  users: [
    {
      type: loginSchema,
      required: true,
    },
  ],
});

const CHATGROUP = MONGOOSE.model("ChatGroupCollection", chatGroupSchema);
module.exports = CHATGROUP;
