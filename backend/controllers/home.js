const cityL = require("./../models/cityList")
const Movie = require("./../models/movie")
const movieHall=require("./../models/theater")
const Slot=require("./../models/sltot");
const { default: mongoose } = require("mongoose");
async function handleGetCity(req, res) {
    const items = await cityL.find({});
    try {
          // Fetch all items
        res.status(200).json(items);      // Send the data as JSON
    } catch (error) {
        res.status(500).json({ message: "Error fetching items", error });
    }
}

async function handleGenerateCity(req, res) {
    const { city } = req.body;
    const cityN = new cityL({
        city
    });
    try {
        // Save the city to the database
        const savedCity = await cityN.save();
        res.status(201).json(savedCity);
    } catch (err) {
        res.status(400).json({ message: 'Error saving city', error: err });
    }
}

async function handleGenerateMovie(req, res) {
    const { name, cityId, image } = req.body;
    try {
        // Check if the cityId exists in the City collection
        // const city = await City.findById(cityId);
        // if (!city) {
        //     return res.status(400).json({ message: 'City not found!' });
        // }
        const newMovie = new Movie({
            name,
            cityId,
            image
        });
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    }catch(err){
        console.log(err);
        res.status(400).json({message:'error Creating in Movie',error:err.message})
    }

};


async function handleGenerateHall(req,res){
    const {name,movieId, cityId}=req.body;
    const HallN= new movieHall({
        name,
        movieId,
        cityId
    });
    try{
        const saveHall=await HallN.save();
        res.status(200).json(saveHall);
    }catch(err){
        res.status(400).json({ message: 'Error In the HallCreation', error: err });
    }
}


async function handleGenerateSlot(req,res){
    const {hallId, time, seatsAvailable, date, movieId, cityId,totalSeats}=req.body;
    const slotN= new Slot({
        hallId,
        time, 
        seatsAvailable, 
        date, 
        movieId, 
        cityId,
        totalSeats

    });
    try{
        const saveSlot=await slotN.save();
        res.status(200).json(saveSlot);
    }catch(err){
        res.status(400).json({ message: 'Error In the Slot Creation', error: err });
    }
}
 


//Getting Single Show
async function getOneShow(req,res){
    try{
        const { _id } = req.query; 
        const items = await Slot.find({ _id: (new mongoose.Types.ObjectId(_id)) });
        return res.status(200).json(items);
    }catch (err) {
        console.error(err);
        return res.status(500).json({ message: "error While getting One Show" });
    }

}
 
async function handleGetMovie(req,res){
    try{
        const ele=await Movie.find({});
        res.status(200).json(ele);
    }catch(error){
        res.status(500).json({ message: "Error fetching items", error });
    }
}
async function handleGetCityMovie(req, res) {
    try {
        const { cityId } = req.query; 
        const items = await Movie.find({ cityId: (new mongoose.Types.ObjectId(cityId)) });
        return res.status(200).json(items);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}


async function handleGetOneMovie(req,res){
    try{
        const {_id}=req.query;
        const item=await Movie.find({_id:(new mongoose.Types.ObjectId(_id))});
        return res.status(200).json(item);
    }catch(err){
        console.error(err);
        return res.status(500).json({messageL:"Error At the Getting One Movie"});
    }
}



async function handleGetHall(req,res){
    try{
        const{cityId}=req.query;
        // ,cityId         ,cityId:(new mongoose.Types.ObjectId(cityId)
        const ele=await movieHall.find({cityId:(new mongoose.Types.ObjectId(cityId))});
        res.status(200).json(ele);
    }catch(err){
        res.status(500).json({message:"Getting error while fetching data from the SLots"});
    }
}
async function handleGetAllSlot(req,res) {
    try{
        // const{movieId,cityId}=req.query;
        // ,cityId         ,cityId:(new mongoose.Types.ObjectId(cityId)
        const ele=await Slot.find({});
        res.status(200).json(ele);
    }catch(err){
        res.status(500).json({message:"Getting error while fetching data from the all SLots"});
    }   
}

async function handleGetSlot(req,res){
    try{
        const {cityId,movieId}=req.query;
        const ele=await Slot.find({cityId:(new mongoose.Types.ObjectId(cityId)),movieId:(new mongoose.Types.ObjectId(movieId))});
        res.status(200).json(ele);
    }catch(err){
        res.status(500).json({message:"Getting error while fetching data from the SLots"});
    }
}


//Confirming Show
// async function updateConfirmShow(req,res){
//     try{
//         const{_id,seatIds}=req.query;
//         // const ele=await Slot.find({_id:(new mongoose.Types.ObjectId(_id))});
//         const seatIdsArray = Array.isArray(seatIds) ? seatIds : seatIds.split(',');

//         const objectSeatIds = seatIdsArray.map((id) => new mongoose.Types.ObjectId(id));

//         const updateshow= await Slot.findOneAndUpdate({_id:(new mongoose.Types.ObjectId(_id))},{$set:{"seatbooks.$[element].isBooked": true}},     {
//             new: true, // Return the updated document
//             arrayFilters: [{ "element._id": { $in: objectSeatIds } }], // Match seats by their IDs
//           }
//         );
//         res.status(200).json({
//             message: "Seats updated successfully",
//             updatedShow,
//           });
//     }catch(err){
//         res.status(500).json({message:"Getting error while fetching data from the Slots"});
//     }
// }


async function updateConfirmShow(req, res) {
    try {
      const { _id, seatIds } = req.body;
  
      // Validate input
      if (!_id || !seatIds) {
        return res.status(400).json({ message: "Slot ID (_id) and seatIds are required" });
      }
  
      // Parse seatIds
      const seatIdsArray = Array.isArray(seatIds) ? seatIds : seatIds.split(',');
      const objectSeatIds = seatIdsArray.map((id) => new mongoose.Types.ObjectId(id));
  
      console.log("Slot ID (_id):", _id);
      console.log("Seat IDs (array):", seatIdsArray);
      console.log("Object Seat IDs:", objectSeatIds);
  
      // Verify Slot exists
      const slot = await Slot.findOne({ _id: new mongoose.Types.ObjectId(_id) });
      if (!slot) {
        return res.status(404).json({ message: "Slot not found" });
      }
  
      console.log("Slot Found:", slot);
  
      // Perform update
      const updatedShow = await Slot.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(_id) },
        { $set: { "seatsAvailable.$[element].isBooked": true } },
        {
          new: true, // Return updated document
          arrayFilters: [{ "element._id": { $in: objectSeatIds } }], // Match seat IDs
        }
      );
  
      if (!updatedShow) {
        return res.status(404).json({ message: "No matching seats found for update" });
      }
  
      res.status(200).json({
        message: "Seats updated successfully",
        updatedShow,
      });
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({
        message: "Getting error while fetching data from the Slots",
        error: err.message,
      });
    }
  }

  async function handleGetDateSlot(req,res){
    try{
        const {date,cityId}=req.query;
        const ele=await Slot.find({date:date, cityId:(new mongoose.Types.ObjectId(cityId))})
        res.status(200).json(ele);
    }catch{
        res.status(500).json({message:"Getting error while sorting shoes date wise"})

    }
  }
  

module.exports = {
    handleGetCity,
    handleGenerateCity,
    handleGenerateMovie,
    handleGenerateHall,
    handleGenerateSlot,
    handleGetMovie,
    handleGetCityMovie,
    handleGetOneMovie,
    handleGetSlot,
    handleGetHall,
    handleGetAllSlot,
    getOneShow,
    updateConfirmShow,
    handleGetDateSlot

}