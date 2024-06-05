// middleware/checkAuthorizedEmail.js
const authorizedEmails = [
    'richashrivastava3591@gmail.com',
    'niyatigupta197@gmail.com',
    // 'accountant@example.com',
    // 'admin@example.com'
  ];
  
  export const checkAuthorizedEmail = (req, res, next) => {
    const { name, email, password, role } = req.body;
    if(!name)
      return next(new Errorhandler("Please Enter your Name", 400));
    
    if (!email) {
      return next(new Errorhandler("Please Enter your Email", 400));
    }
    if (!password) {
      return next(new Errorhandler("Please Enter your Password", 400));
    }
    if (!role) {
      return next(new Errorhandler("Please Mention your role", 400));
    }
    //const { email } = req.body;
    if (authorizedEmails.includes(email)) {
      next(); // Email is authorized, proceed to the next middleware or route handler
    } else {
      res.status(403).json({ message: 'This email is not authorized to register' });
    }
  };
  
  
  