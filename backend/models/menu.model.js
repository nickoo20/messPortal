import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    menu: {
        type: String,
        required: true
    },
    pdfPath: {
        type: String
    },
},{timestamps:true}) ;

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;
