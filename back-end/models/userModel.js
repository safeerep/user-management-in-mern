const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }, 
    password: {
        type: String,
        required: true,
        minlength: 6
    }
})

const collection = mongoose.model("Users", userShema);
module.exports = collection;

