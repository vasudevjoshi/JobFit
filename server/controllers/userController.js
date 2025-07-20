const User = require('../models/User');
const OTP = require('../models/OTPschema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const mailSender = require('../utils/mailSender');
const { uploadImage, deleteImage } = require('../config/cloudinary');

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
                secure: true,
                sameSite: 'none',
            }
            // Set cookie with key as 'jobfit_token'
            res.cookie("jobfit_token", token, options);
            // Set token in response header
            res.setHeader("jobfit_token", token);
            // Send response
            return res.status(200).json({
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

const updateProfile = async (req, res) => {
    try {
        const { FullName, email, phone } = req.body;
        const userId = req.user.id; // From middleware

        // Validate required fields
        if (!FullName || !email) {
            return res.status(400).json({
                success: false,
                message: "Full Name and Email are required",
            });
        }

        // Check if email is already taken by another user
        const existingUser = await User.findOne({ 
            email: email, 
            _id: { $ne: userId } 
        });
        
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email is already in use by another account",
            });
        }

        // Validate phone number format if provided
        if (phone && phone.trim() !== '') {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
                return res.status(400).json({
                    success: false,
                    message: "Please enter a valid phone number",
                });
            }
        }

        // Handle image upload if file is provided
        let imageUrl;
        if (req.file) {
            try {
                // Get current user to delete old image if it's from Cloudinary
                const currentUser = await User.findById(userId);
                
                // Upload new image to Cloudinary
                const uploadResult = await uploadImage(req.file.path, {
                    folder: 'profile-images',
                    public_id: `user_${userId}_${Date.now()}`,
                    width: 400,
                    height: 400,
                });
                
                imageUrl = uploadResult.secure_url;
                
                // Delete old image if it's from Cloudinary (not the default dicebear image)
                if (currentUser.image && currentUser.image.includes('cloudinary.com')) {
                    const publicId = currentUser.image.split('/').slice(-2).join('/').split('.')[0];
                    await deleteImage(publicId).catch(err => console.log('Failed to delete old image:', err));
                }
                
            } catch (uploadError) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to upload image",
                });
            }
        }

        // Prepare update data
        const updateData = {
            FullName: FullName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone && phone.trim() !== '' ? phone.trim() : null,
        };

        // Add image URL if uploaded
        if (imageUrl) {
            updateData.image = imageUrl;
        }

        // Update user profile
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { 
                new: true, // Return updated document
                runValidators: true // Run schema validators
            }
        ).select('-password'); // Exclude password from response

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser,
        });

    } catch (error) {
        console.log("Error in updating profile:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // From middleware

        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile retrieved successfully",
            data: user,
        });

    } catch (error) {
        console.log("Error in getting profile:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const uploadProfileImage = async (req, res) => {
    try {
        const userId = req.user.id;
        
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image file provided",
            });
        }

        // Get current user to delete old image
        const currentUser = await User.findById(userId);
        if (!currentUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        try {
            // Upload new image to Cloudinary
            const uploadResult = await uploadImage(req.file.path, {
                folder: 'profile-images',
                public_id: `user_${userId}_${Date.now()}`,
                width: 400,
                height: 400,
            });

            // Delete old image if it's from Cloudinary
            if (currentUser.image && currentUser.image.includes('cloudinary.com')) {
                const publicId = currentUser.image.split('/').slice(-2).join('/').split('.')[0];
                await deleteImage(publicId).catch(err => console.log('Failed to delete old image:', err));
            }

            // Update user with new image URL
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { image: uploadResult.secure_url },
                { new: true }
            ).select('-password');

            return res.status(200).json({
                success: true,
                message: "Profile image updated successfully",
                data: updatedUser,
                imageUrl: uploadResult.secure_url,
            });

        } catch (uploadError) {
            return res.status(500).json({
                success: false,
                message: "Failed to upload image to cloud storage",
            });
        }

    } catch (error) {
        console.log("Error in uploading profile image:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = { 
    sendOtp, 
    signup, 
    login, 
    updateProfile, 
    getProfile, 
    uploadProfileImage 
};