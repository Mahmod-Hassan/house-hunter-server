const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const houseOwnerSchema = require('../schemas/houseOwnerSchema');
const House = new mongoose.model('House', houseOwnerSchema);


router.post('/', async (req,res) => {
    const data= req.body;
    const house = new House(data);
    const result = await house.save();
    res.send(result);
})

router.get('/:email', async (req,res) => {
    const email = req.params.email;
    const data = await House.find({email: email});
    res.send(data);
})

router.get('/', async (req,res) => {
    const data = await House.find({});
    res.send(data);
})

router.delete('/:id', async (req,res) => {
    const id = req.params.id;
    const data = await House.deleteOne({_id: id});
    res.send(data);
})

router.put('/:id', async (req,res) => {
    const id = req.params.id;
    const data = req.body;
    const filter = {_id: id};
    const result = await House.updateOne(filter,{ $set:data});
    res.send(result);
})

module.exports = router;