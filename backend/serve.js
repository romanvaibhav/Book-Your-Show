const express=require("express");
const app=express();
const mongoose=require("mongoose")
const PORT=3002;
const cors = require('cors');
// app.use(cors());  // Allows requests from any origin
app.use(cors({
    origin: 'http://localhost:4200',  // Add your frontend URLs here
  }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect(`mongodb+srv://vaibhavroman51:qF46FQs26f1nD6OT@cluster1.zmpz0.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster1
`).then(()=>{
    console.log("MongoDb is Connected Succesfully");

})
.catch(error => {
    console.log("MongoDb connection error:", error);
});


const userRoute=require("./route/homeroute");


app.use("/user",userRoute);



app.listen(PORT,()=>{console.log(`Server Started at PORT:${PORT}`)})