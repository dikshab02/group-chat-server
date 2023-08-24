const MONGOOSE = require("mongoose");
const { loginSchema } = require("./Login");
const STRING = MONGOOSE.Schema.Types.String;

const chatGroupSchema = new MONGOOSE.Schema({
  name: {
    type: STRING,
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
