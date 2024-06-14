import mongoose from 'mongoose' ;
const wardenSchema = new mongoose.Schema({
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
    // hostelRequested:{
    //     type:String,
    //     enum: ['Girls Hostel', 'Jhelum Boys Hostel', 'Chenab Boys Hostel', 'Manasbal Boys Hostel', 'Manasar Boys Hostel'],
    // },
    hostelName:{
        type:String,
        enum: ['Girls Hostel', 'Jhelum Boys Hostel', 'Chenab Boys Hostel', 'Manasbal Boys Hostel', 'Manasar Boys Hostel', 'Indus Boys Hostel'],
        default:"Girls Hostel",
    },
}) ;

const Warden = mongoose.model('Warden',wardenSchema); 
export default Warden ; 
