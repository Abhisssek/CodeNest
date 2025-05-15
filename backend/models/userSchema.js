const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    userName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    projectCreated:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    projectJoined:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    socketId:{
        type: String,
        default: null
    },
    isOnline:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    },



})


const User = mongoose.model("User", userSchema);
module.exports = User;