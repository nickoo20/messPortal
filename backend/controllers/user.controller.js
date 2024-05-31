import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const updateUserPassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password } = req.body;
    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.error(`Error updating password: ${err.message}`);
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
    console.log(`Error in getUserProfile Controller, ${error.message}`);
    return res.status(500).json({
      error: error.message,
    });
  }
};
