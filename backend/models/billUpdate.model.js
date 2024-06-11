import mongoose from 'mongoose';
const billSchema=mongoose.Schema({
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
    billPerDay: {
        type: Number,
        required: true,
        min: 0,
        //required:true
    },
    serviceCharge: {
        type: Number,
        required: true,
        min: 0,
        //required:true
    }
})
export const billUpdate=mongoose.model('BillPerDay',billSchema);