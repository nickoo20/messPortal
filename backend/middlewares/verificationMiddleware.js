import User from "../models/user.model.js" ;

export const selfVerificationMiddleware = async(req, res, next) => {
    const user = await User.findById(req.user.id) ;
    if(!user.isVerified){
        return res.status(403).json({
            message:'User not verified!',
        }) ;
    }
    next() ;
};


export const wardenVerificationMiddleware= async(req, res, next) =>{ 
    const user = await User.findById(req.user.id) ;
    if(!user.isWardenVerified){
        return res.status(400).json({
            message:'User not warden verified!',
        }) ;
    }
    next() ;
}
