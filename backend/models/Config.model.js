import mongoose from 'mongoose';

const ConfigSchema=new mongoose.Schema({
    costPerDay:{
        type:Number,
        required:true,
        default:100,
    },
}) ;

const Config = mongoose.model('Config', ConfigSchema) ;
export default Config;