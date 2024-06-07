import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema({
  registrationNumber: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

export const LeaveModel = mongoose.model("Leave", LeaveSchema);
