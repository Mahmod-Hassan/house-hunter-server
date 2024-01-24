const mongoose = require('mongoose');

const houseRenterSchema = mongoose.Schema({
  renterNumber: String,
  fullName: String,
  email: String,
  renterNumber: String,
  houseName: String,
  location: String,
  city: String,
  picture: String,
  rentPerMonth: String,
  ownerNumber: String,
})

module.exports = houseRenterSchema;