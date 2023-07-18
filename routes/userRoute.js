const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const userSchema = require('../schemas/userSchema');
const User = new mongoose.model("User", userSchema);


router.post('/signup', async (req, res) => {
    const {fullName, role, phoneNumber, email, password} = req.body;
    try {
        const oldUser = await User.findOne({email})
        if(oldUser){
            return res.send({message: 'user already exist'})
        }
        const hashPassword = await bcrypt.hash(password, 10);
        // console.log(typeof(hashPassword));
        const newUser = new User({
            fullName,
            role,
            phoneNumber,
            email,
            password: hashPassword,
        })
        const data = await newUser.save();
        res.send(data);
    }
    catch (err) {
        res.status(401).send({message: 'authentication failed'})
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
   try {
    const user = await User.findOne({email})
    if(!user){
        return res.send({message: 'user not found'})
    }
   }
   catch {
      res.status(403).send({message: 'authentication failed'})
   }
})


module.exports = router;