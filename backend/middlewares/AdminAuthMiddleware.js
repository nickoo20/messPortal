import jwt from 'jsonwebtoken' ;
import {adminModel as User} from '../models/admin.model.js' ;

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
export const AdminauthMiddleWare = async(req, res, next) => {
    console.log("in the middleware");
    
    console.log(req.cookies)
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
        console.log(decoded)
        const user = await getUserByEmail(decoded.email);
        console.log(user); 
        req.user= user ;
        next() ;
    }catch(error){
        console.log(`Error in AuthMiddleware:,  ${error.message}`) ;
    }
}
