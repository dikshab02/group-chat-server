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

const chatGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    users: [{
        type: LoginSchema,
        required: true
    }]
})

const chatMessageSchema = new mongoose.Schema({
    chatGrpId : {
        type: String,
        required: true
    },
    user: {
        type: LoginSchema, 
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    message: {
        type: String,
        required: true     
    }
})

const userCollection = new mongoose.model("loginuserCollection",LoginSchema);
const chatGroupCollection = new mongoose.model("ChatGroupCollection",chatGroupSchema);
const chatMessageCollection = new mongoose.model("chatMessageCollection",chatMessageSchema)

module.exports = {userCollection, chatGroupCollection, chatMessageCollection};
