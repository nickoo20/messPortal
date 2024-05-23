import mongoose from "mongoose" ;

export const connectToMongoose = async() => { 
    try{
        await mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log(`Mongo_Database is Connected !, ${mongoose.connection.host}`) ; 
        }).catch((err) => {
            console.log(err.message) ;
        })
    }catch(error){
        console.log(`Error connecting to MONGO_DB!`, error.message) ;
    }
}