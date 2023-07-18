const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: String,
    role: String,
    phoneNumber: String,
    email: String,
    password: String,
})

module.exports = userSchema;