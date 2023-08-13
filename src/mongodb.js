const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/NewApp")
.then(()=>{
    console.log("mongodb connected");
})
.catch((err)=>{
    console.log("failed to connect: ", err);
})

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const collection = new mongoose.model("LoginCollection",LoginSchema);
module.exports = collection;
