const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const houseRenterSchema = require('../schemas/houseRenterSchema');
const Booking = new mongoose.model('Booking', houseRenterSchema);

router.get('/', async (req,res) => {
    const email = req.query.email;
    const data = await Booking.find({email: email});
    res.send(data);
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await Booking.deleteOne({_id: id});
    res.send(data);
})
router.post('/', async (req, res) => {
    const data= req.body;
    const booking = new Booking(data);
    const result = await booking.save();
    res.send(result);
})

module.exports = router;
