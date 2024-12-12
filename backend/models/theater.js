const mongoose=require("mongoose");
const City=require("./../models/cityList")
const Movie = require("./../models/movie")

const HallName= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movie",
        required:true

    }
    ,
    cityId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"City",
        required:true
    }
})
const movieHall=mongoose.model('Hall',HallName);

module.exports=movieHall;
