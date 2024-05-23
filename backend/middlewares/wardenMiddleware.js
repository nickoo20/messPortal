import User from "../models/user.model.js" ;

export const assignorCreateWarden = async(req, res, next) => {  
    try{
        // Find the warden by their known email address
        let warden = await User.findOne({email:process.env.WARDEN_EMAIL}) ;
        const hashedPassword = await bcrypt.hash("defaultPassword", 10);
        if(!warden){
            warden = new User({
                email:process.env.WARDEN_EMAIL,
                role:'warden',
                password: hashedPassword,

            }) ;
            await warden.save();
        }

        // Attach the warden ID to the request object
        req.wardenId =  warden._id ;
        next() ;

    }catch(error){
        console.error(`Error while asigning warden!, ${err.message}`) ;
        return res.status(500).json({ error: "Server error" }) ;
    }
}