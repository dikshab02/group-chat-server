const MONGOOSE = require("mongoose");
const STRING = MONGOOSE.Schema.Types.String;

const loginSchema = new MONGOOSE.Schema({
    name: {
        type: STRING,
        required: true
    },
    password: {
        type: STRING,
        required: true
    }
})

const LOGIN = MONGOOSE.model('LoginCollection', loginSchema);
module.exports = {LOGIN, loginSchema}
