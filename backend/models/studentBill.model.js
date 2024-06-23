import mongoose from 'mongoose';

const studentBillSchema = new mongoose.Schema({
  registrationNumber: {
    type: Number,
    required: true
  },
  studentName:{
      type:String,
      required:true
  },
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  festival: {
    type: String,
    required: true
  },
  totalbill:{
     type:Number,
     required:true
  },
  billPerDay:{
     type:Number,
     required:true
  },
  festivalcharges: {
    type: Number,
    required: true
  },
  serviceCharge: {
    type: Number,
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

export const StudentBill = mongoose.model('StudentBill', studentBillSchema);


