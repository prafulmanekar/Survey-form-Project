const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    "username": String,
    "email": String,
    "phone": Number,
    "profession": String,
    "password": String
})

let userModel = mongoose.model('Users', userSchema)

module.exports = userModel