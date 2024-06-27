import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import Settings from "../models/setting.model.js";

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure user can only update their own account
    if (id !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only update your own account!",
        success: false,
      });
    }

    const user = await User.findById(id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found", success: false });
    }

    const { password, contactNumber, hostelName } = req.body;

    // Validate and update contact number if provided
    if (contactNumber && user.contactNumber !== contactNumber) {
      if (contactNumber.length !== 10) {
        return res.status(400).json({ 
          error: "Enter a valid 10-digit contact number!", 
          success: false 
        });
      }
      user.contactNumber = contactNumber;
    }

    // Validate and update the password if provided
    if (password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          error: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
          success: false,
        });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Check if hostel name change is allowed by settings and update if provided
    const setting = await Settings.findOne({});
    if (setting && setting.enableHostelChange && hostelName) {
      user.hostelName = hostelName;
    }

    await user.save();

    res.status(200).json(user);
  } catch (err) {
    console.error(`Error updating user: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};

export const getUser=async(req, res) =>{ 
  try{
      const {id} = req.params ;
      if(id != req.user._id.toString()){
        return res.status(404).json('Youn can only update your profile') ;
      }
      const user = req.user ;
      if(!user){
        return res.status(404).json({
          message:'User not found!',
        }) ;
      }
      return  res.status(201).json(user) ;
  }catch(err){
    console.log(err.message) ;
    return res.status(500).json(err.message) ;
  }
}
