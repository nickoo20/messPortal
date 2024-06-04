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
    // HostelID: {
    //   type: Number,
    //   required: true,
    // },
    // HostelName: {
    //   type: String,
    //   required: true,
    // },
    verified: {
      type: Boolean,
      default: false
    },
    role: {
      type:String,
        // required: true,
        enum:['accountant', 'warden'], 
        default:'warden',
    },
  },
  { timestamps: true }
);

export const adminModel = mongoose.model("Admin", AdminSchema);
//export  {adminModel}
