import mongoose from 'mongoose';
const NoticeSchema=new mongoose.Schema({
        hostelName:{
            type:String,
            enum:['Girls Hostel', 'Jhelum Boys Hostel', 'Manasbal Boys Hostel', 'Mansar Boys Hostel', 'Chenab Boys Hostel'],
            required:true
        },
        Title:{
            type:String,
            required:true
        },
        Description:{
            type:String,
            required:true
        }
});
const Notice=mongoose.model('Notice',NoticeSchema);
export default Notice;