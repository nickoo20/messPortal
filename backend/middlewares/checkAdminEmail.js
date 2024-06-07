// middleware/checkAuthorizedEmail.js
import {errorHandler} from '../utils/error.js' ; 
const authorizedEmails = [
    'richashrivastava3591@gmail.com',
    'niyatigupta197@gmail.com',
    'niyatigupta985@gmail.com',
    // 'accountant@example.com',
    // 'admin@example.com'
  ];
  
  export const checkAuthorizedEmail = (req, res, next) => {
    const { name, email, password, role } = req.body;
    if(!name)
      return next(new errorHandler("Please Enter your Name", 400));
    
    if (!email) {
      return next(new errorHandler("Please Enter your Email", 400));
    }
    if (!password) {
      return next(new errorHandler("Please Enter your Password", 400));
    }
    if (!role) {
      return next(new errorHandler("Please Mention your role", 400));
    }
    if (authorizedEmails.includes(email)) {
      next();
    } else {
      res.status(403).json({ message: 'This email is not authorized to register' });
    }
  };
  
  
  