const jwt = require("jsonwebtoken");
require("dotenv").config();
const isLoggedIn = async (req,res,next) =>{
    try{
        const token  = req.cookies.jobfit_token || req.body.token || req.header("Authorization")?.replace("Bearer ","");
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Please login to access this resource",
            });
        }
        try{

            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decoded;

        }catch(error){
            return res.status(401).json({
                success:false,
                message:"Token is invalid",
            });
        }
        next();
    }catch(error){
        console.log("Error in isLoggedIn middleware",error.message);
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token",
        });
    }
}

module.exports = {isLoggedIn};