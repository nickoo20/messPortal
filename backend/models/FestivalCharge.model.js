import mongoose from "mongoose";
const FestivalCharge=new mongoose.Schema({
    registrationNumber:{
        type:Number,
        required:true,

    },
    month:{
        type: Number,
        required: true,
        min: 1,
        max: 12,
        required:true
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        required:true // You can adjust this to fit your application's needs
    },
    festival:{
        type:String,
        required:true
    },
    charge:{
        type:Number,
        required:true
    }
});
 const FestCharge=mongoose.model("FestCharge",FestivalCharge);
 export default FestCharge