import nodemailer from 'nodemailer' ;

export const verificationByStudent=async(req, res, userEmail, token) => { 
    try{
        const transporter = nodemailer.createTransport({
            service:"Gmail",
            auth:{
                user:"gniyati20@gmail.com",
                pass: "wxke nldd fpeu bzxa",
            },
        }) ;
        const mailOptions = {
            from: "gniyat20@gmail.com",
            to: userEmail,
            subject: "Verify Email",
            html:`<p>Please click the following link to verify email 
            <a href="http://localhost:8080/api/auth/verify/user?token=${token}">Verify your email</a></p>`,
        }
        await transporter.sendMail(mailOptions) ;
        return res.status(201).json({
            message:"User created successfully!"
        })
    }catch(error){
        console.log(error) ;
        return res.status(500).json({
            error: "Internal Server error!",
          });
    }
}

export const emailVerificationByStudent = async(req, res) => {
    try{
        const adminEmail = "niyatigupta197@gmail.com" ;
        const token = req.query.token ;
        if(!token){
            return res.status(404).json({
                message:"Token is required!",
            }) ;
        }
        // const decoded = await 

    }catch(err){
        console.log(err)  ;
    }
}