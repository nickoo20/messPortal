import mongoose from 'mongoose' ;
const wardenSchema = new mongoose.Schema({
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
    hostelName:{
        type:String,
        enum: ['Girls Hostel', 'Jhelum Boys Hostel', 'Chenab Boys Hostel', 'Manasbal Boys Hostel', 'Manasar Boys Hostel', 'Indus Boys Hostel'],
        default:"Girls Hostel",
    },
    role:{
        type:String,
        enum: ['warden', 'accountant'],
        default: 'warden',
    },
    // contactNumber: {
    //     type:Number,
    //     required:true,
    // },
}, {timeStamps:true}) ;

const Warden = mongoose.model('Warden',wardenSchema); 
export default Warden ; 

