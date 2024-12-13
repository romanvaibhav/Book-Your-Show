const express=require("express");
const router=express.Router();

const {handleGetCity,handleDeleteShow,handleGetDateSlot,updateConfirmShow,getOneShow,handleGetAllSlot,handleGetHall,handleGetSlot,handleGetOneMovie,handleGetCityMovie,handleGetMovie,handleGenerateSlot,handleGenerateCity,handleGenerateMovie,handleGenerateHall}=require("./../controllers/home")


router.post("/city",handleGenerateCity);

router.get("/city",handleGetCity);

router.post("/city/movie",handleGenerateMovie)
router.get("/city/movie",handleGetMovie)
router.get("/city/fmovie",handleGetCityMovie);
router.get("/city/onemovie",handleGetOneMovie);
router.get("/city/slot",handleGetSlot);
router.get("/city/allslot",handleGetAllSlot);
router.get("/city/date",handleGetDateSlot)
router.get("/city/hall",handleGetHall);
router.get("/city/oneshow",getOneShow)



router.patch("/city/confirm",updateConfirmShow);



router.post("/city/hall",handleGenerateHall);
router.post("/city/slot",handleGenerateSlot);


router.delete("/city/show/delete",handleDeleteShow);

module.exports=router;






// async function handleGetHall(req,res){
//     try{
//         const{movieId}=req.query;
//         // ,cityId         ,cityId:(new mongoose.Types.ObjectId(cityId)
//         const ele=await movieHall.find({movieId:(new mongoose.Types.ObjectId(movieId))});
//         res.status(200).json(ele);
//     }catch(err){
//         res.status(500).josn({message:"Getting Error in Movie Hall"});
//     }
// }