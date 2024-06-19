import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import Settings from "../models/setting.model.js";
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Ensure the user can only update their own account
    if (id !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only update your own account!",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password, contactNumber, hostelName } = req.body;

   
    if (password) {
      const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&#])[A-Za-z\d@$!%?&#]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          error: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
        });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Update contact number if provided
    if (contactNumber) {
      user.contactNumber = contactNumber;
    }

    // Update hostel name if provided
    if (hostelName) {
      const setting=await Settings.findOne({});
      if(setting.enableHostelChange===true)
      user.hostelName = hostelName;
      else{
        return res.status(400).json({message:"You are not allowed to Change Hostel at this moment"});
      }
    }

    await user.save();

    res.status(200).json(user);
  } catch (err) {
    console.error(`Error updating user: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id }).select("-password");
    if (!user) {
      return res.status(404).json({
        error: "User not Found!",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(`Error in getUserProfile Controller ${error.message}`);
    return res.status(500).json({
      error: error.message,
    });
  }
};