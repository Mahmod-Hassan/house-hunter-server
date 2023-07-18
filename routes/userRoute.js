const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const userSchema = require('../schemas/userSchema');
const User = new mongoose.model("User", userSchema);


router.post('/signup', async (req,res) => {
    const {fullName, role, phoneNumber, email, password} = req.body;
    // console.log(fullName, role, phoneNumber, email, password);
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        // console.log(typeof(hashPassword));
        const newUser = new User({
            fullName,
            role,
            phoneNumber,
            email,
            password: hashPassword,
        })
        await newUser.save();
        res.status(500).send({message: "successfully sign up"});
    }
    catch {
        res.status(403).send({message: "authentication failed"})
    }
})

module.exports = router;