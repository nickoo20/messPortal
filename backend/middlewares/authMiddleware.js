import jwt from 'jsonwebtoken' ;

export const authMiddleWare = (req, res, next) => {
    const token = req.cookies.access_token ;
    if(!token){
        return res.status(400).json({
            message:'No Token, Authorization denied!',
        }) ;
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET) ;
        console.log(decoded) ;
        req.user= decoded.email ;
        next() ;
    }catch(error){
        console.log(error.message) ;
    }
}
