import express from 'express' ;
import User from '../models/user.model.js' ; 
const router = express.Router() ;

router.get('/verify/:token',async(req, res) => {
    try{    
        const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
        let user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid token' });
        }

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        res.status(200).json({ msg: 'Email verified successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}) ;

router.post('/warden-verify', async (req, res) => {
    const { email } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        user.isWardenVerified = true;
        await user.save();

        res.status(200).json({ msg: 'User verified by warden successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


export default router; 