import jwt from 'jsonwebtoken' ;
import User from '../models/user.model.js' ;

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email }).select("-password");
        return user;
    } catch (error) {
        console.error(`Error in getUserByEmail: ${error.message}`);
        return null;
    }
};

export const authMiddleWare = async (req, res, next) => {
    const token = req.cookies.access_token ;

    if (!token) {
        return res.status(403).json({
            message: 'Unauthorized!',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await getUserByEmail(decoded.email);

        if (!user) {
            return res.status(404).json({
                message: 'User not found!',
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(`Error in authMiddleWare: ${error.message}`);
        return res.status(500).json({
            error: error.message,
        });
    }
};


// export const authMiddleWare = async(req, res, next) => {
//     console.log("in the middleware");
    
//     console.log(req)
//     const token = req.cookies?.access_token ;
//    // console.log(token);
//     if(!token){
//         return res.status(400).json({
//             message:'No Token, Authorization denied!',
//         }) ;
//     }
//     try{
//         const decoded=jwt.verify(token,process.env.JWT_SECRET) ;
//         // console.log(decoded) ;
//         console.log(decoded)
//         const user = await getUserByEmail(decoded.email);
//         console.log(user); 
//         req.user= user ;
//         next() ;
//     }catch(error){
//         console.log(`Error in AuthMiddleware:,  ${error.message}`) ;
//     }
// }
// >>>>>>> accountant
