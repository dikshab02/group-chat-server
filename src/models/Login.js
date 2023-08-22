const MONGOOSE = require("mongoose");
const loginSchema = new MONGOOSE.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const LOGIN = MONGOOSE.model('LoginCollection', loginSchema);
module.exports = {LOGIN, loginSchema}
