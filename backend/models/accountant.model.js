import mongoose from 'mongoose' ;
const accountantSchema = new mongoose.Schema({
    profilePicture:{
        type:String,
        default:"https://vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
    },
    name :{
        type:String,
        required:true,
    },
    email :{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isSelfVerified:{
        type:Boolean,
        default:false,
    },
    isDSWVerified:{
        type:Boolean,
        default:false,
    },
    role:{
        type:String,
        default:'accountant',
    },
}) ;

const Accountant = mongoose.model('Accountant',accountantSchema); 
export default Accountant; 
