const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: String,
    role: String,
    phoneNumber: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
})

module.exports = userSchema;