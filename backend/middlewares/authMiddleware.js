import jwt from 'jsonwebtoken' ;
import User from '../models/user.model.js' ;

const getUserByEmail = async(email) => {
    try {
        const user = await User.findOne({ email }).select("-password") ;
        return user ;
    } catch (error) {
        console.error(`Error in getUserByEmail: ${error.message}`);
        return res.status(500).json({
            error: error.message,
        }) ;
    }
}
export const authMiddleWare = async(req, res, next) => {
    const token = req.cookies?.access_token ;
    console.log(token);
    if(!token){
        return res.status(400).json({
            message:'No Token, Authorization denied!',
        }) ;
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET) ;
        // console.log(decoded) ;
        const user = await getUserByEmail(decoded.email); 
        req.user= user ;
        next() ;
    }catch(error){
        console.log(`Error in AuthMiddleware:,  ${error.message}`) ;
    }
}
