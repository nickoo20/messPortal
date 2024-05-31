import mongoose from "mongoose";
const LeaveSchema= new mongoose.Schema({
    registrationNumber: {
        type:String,
        required:true,
    },
    startDate:{
        type:Date,
        required:true,
    },
    endDate:{
        type:Date,
        required:true,
    },
}) ;

const Leave = mongoose.model("Leave", LeaveSchema) ; 
export default Leave ;