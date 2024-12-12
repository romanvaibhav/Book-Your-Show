const mongoose = require('mongoose');
const City=require("./../models/cityList")
// Movie Schema
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cityId: {
    type: mongoose.Schema.Types.ObjectId,  // This is a reference to the City model
    ref: "City",  // This points to the City model
    required: true
  },
  image: {
    type: String,  // The image URL is stored as a string
    required: true,  
  },
}, { timestamps: true });

// Create Movie Model
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
