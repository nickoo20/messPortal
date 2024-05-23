import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config() ;

const generateTokenAndSetCookie = ( email ) => {
  return jwt.sign({ email }, process.env.JWT_SECRET) ;
} ;

export default generateTokenAndSetCookie ;
