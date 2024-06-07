import mongoose from "mongoose";
import validator from "validator";

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    HostelName: {
      type:String,
      enum:['Girls Hostel', 'Jhelum Boys Hostel', 'Manasbal Boys Hostel', 'Mansar Boys Hostel', 'Chenab Boys Hostel'],
      default: 'Girls Hostel',
    },
    verified: {
      type: Boolean,
      default: false
    },
    role: {
        type:String,
        enum:['accountant', 'warden'], 
        default:'warden',
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin ;
