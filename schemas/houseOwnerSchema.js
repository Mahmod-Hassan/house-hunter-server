const mongoose = require('mongoose');

const houseOwnerSchema = mongoose.Schema({
  houseName: String,
  location: String,
  city: String,
  bedrooms: String,
  bathrooms: String,
  roomSize: String,
  picture: String,
  availableDate: String,
  rentPerMonth: String,
  phoneNumber: String,
  description: String,
})

module.exports = houseOwnerSchema;