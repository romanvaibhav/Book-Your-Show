// city.model.js
const mongoose = require('mongoose');

// Define the City Schema
const citySchema = new mongoose.Schema({
  city: { type: String, required:true },
}, { timestamps: true });  // Optionally add createdAt and updatedAt fields

// Create the City model
const City = mongoose.model('CityList', citySchema);

module.exports = City;
