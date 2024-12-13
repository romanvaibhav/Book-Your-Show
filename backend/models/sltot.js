const City = require("./../models/cityList")
const Movie = require("./../models/movie") // Assuming this is where your Hall model is defined
const movieHall = require("./../models/theater")
const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: {
    type: Number,  
  },
  row: {
    type: String,  
    required: true
  },
  isBooked: {
    type: Boolean,  
    default: false  
  },
  price: {
    type: Number,
    required: true
  },
});

const slotSchema = new mongoose.Schema({
  hallId: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to the Hall model
    ref: 'movieHall',  // Points to the Hall model
    required: true
  },
  time: {
    type: String,  // Time in string format (e.g., "02:30 PM")
    required: true
  },
  seatsAvailable: {
    type: [seatSchema],  // Array of seat numbers available for that slot
    required: true
  },
  date: {
    type: String,  // Date in string format (e.g., "2024-12-06")
    required: true
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  }
  ,
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: true
  },
  totalSeats:{
    type:Number,
    required:true
  },
  rowSeats:{
    type:Number,
    required:true,
  }
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
