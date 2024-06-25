import mongoose from "mongoose" ;

const userSchema= new mongoose.Schema({
    profilePicture:{
        type:String,
        default:"https://vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
    },
    email : {
        type:String,
        required:true,
    },
    password:{
        type:String,
    },
    enrollmentNumber : {
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    registrationNumber:{
        type:Number,
        required:true,
    },
    role:{
        type:String,
        enum:['student', 'warden','accountant'], 
        default:'student',
    },
    hosteller:{
        type:Boolean,
        required:false,
    },
    hostelName:{
        type:String,
        enum: ['Girls Hostel', 'Jhelum Boys Hostel', 'Chenab Boys Hostel', 'Manasbal Boys Hostel', 'Manasar Boys Hostel', 'Indus Boys Hostel'],
        default:"Girls Hostel",
    },
    contactNumber:{
        type:Number,
        required:true,
        validate: {
        validator: function(v) {
            return /^\d{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid 10-digit number!`
        }
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isWardenVerified:{
        type:Boolean,
        default:false,
    },
    studentRep:{
        type:Boolean,
        default:false,
    },
    
},{timestamps:true}) ;

const User = mongoose.model("User", userSchema) ;
export default User ;