import Warden from '../models/warden.model.js'; 
import Accountant from '../models/accountant.model.js'; 
import bcrypt from 'bcryptjs' ; 

export const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('req.user', req.user) ;
        // Ensure the user can only update their own account
        if (id !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You can only update your own account!",
            });
        }

        let admin = await Warden.findById(id) || await Accountant.findById(id);

        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        const { password } = req.body;
        if (password) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).json({
                    error: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
                });
            }

            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(password, salt);
        }

        await admin.save();

        res.status(200).json(admin);
    } catch (err) {
        console.error(`Error updating user: ${err.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};