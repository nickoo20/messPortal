import jwt from 'jsonwebtoken';
import Warden from '../models/warden.model.js';
import Accountant from '../models/accountant.model.js';

const getUserByEmail = async (email) => {
    try {
        let user = await Warden.findOne({ email }).select("-password");
        if (!user) {
            user = await Accountant.findOne({ email }).select("-password");
        }
        return user;
    } catch (error) {
        console.error(`Error in getUserByEmail: ${error.message}`);
        throw new Error('Internal Server Error');
    }
};

export const AdminauthMiddleWare = async (req, res, next) => {
    const token = req.cookies?.access_token;
    if (!token) {
        return res.status(400).json({
            message: 'No Token, Authorization denied!',
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
        console.error(`Error in AdminauthMiddleWare: ${error.message}`);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};
