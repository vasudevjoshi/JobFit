const User = require('../models/User');
const OTP = require('../models/OTPschema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const mailSender = require('../utils/mailSender');

const sendOtp = async (req,res)=>{
   try{
     const {email} =req.body;
    if(!email){
        return res.status(400).json({
            success:false,
            message:"enter all the fields"
        })
    }
    const alreadyExists = await User.findOne({email});
    if(alreadyExists){
        return res.status(400).json({
            success:false,
            message:"user already exists"
        })
    }
    let otp = otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false});
    const result = await OTP.findOne({otp:otp});
    if(result){
        while(result){
            otp = otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false});
            result = await OTP.findOne({otp:otp});
        }
    }
    const OTPpayload ={
        email,
        otp
    }
    const otpResult = await OTP.create(OTPpayload);
    return res.status(200).json({
        success:true,
        message:"OTP sent successfully",
    })

   }catch(error){
    return res.status(500).json({
        success:false,
        message:"Error sending the OTP" + error.message,
    })
   }

}
const signup = async(req,res)=>{
    try{
        const { email, FullName, password, otp } = req.body;
        if(!email || !FullName || !password || !otp){
            return res.status(400).json({
                success:false,
                message:"enter all the fields"
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"user already exists"
            })
        }
        const recentOtp = await OTP.findOne({email:email}).sort({createdAt:-1}).limit(1);
        if(!recentOtp){
            return res.status(400).json({
                success:false,
                message:"OTP not found",
            });
        }

        // Check if OTP is expired (older than 300 seconds)
        const now = Date.now();
        const otpCreatedAt = new Date(recentOtp.createdAt).getTime();
        if ((now - otpCreatedAt) > 300 * 1000) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired. Please request a new one.",
            });
        }

        if(recentOtp.otp !== otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP",
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const result = await User.create({
            FullName,
            email,
            password:hashedPassword,
            image:`https://api.dicebear.com/9.x/initials/svg?seed=${FullName}`,
        })
        return res.status(200).json({
            success:true,
            message:"User created successfully",
            result
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while signing up" + error.message,
        })
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }
        const userData = await User.findOne({ email: email });
        if (!userData) {
            return res.status(400).json({
                success: false,
                message: "User not found,Please sign up",
            });
        }
        const isPasswordMatched = await bcrypt.compare(password, userData.password);
        if (isPasswordMatched) {
            const payload = {
                email: userData.email,
                id: userData._id,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            userData.token = token;
            userData.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                // Add these for cross-site cookies if needed:
                // secure: true,
                // sameSite: 'none',
            }
            // Set cookie with key as 'jobfit_token'
            res.cookie("jobfit_token", token, options).status(200).json({
                success: true,
                message: "User logged in successfully",
                token: token,
                data: userData,
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }
    }
    catch (error) {
        console.log("Error in logging in", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}


module.exports ={sendOtp,signup,login};