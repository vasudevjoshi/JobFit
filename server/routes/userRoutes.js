const express = require("express");
const router = express.Router();
const multer = require('multer');
const { sendOtp, signup, login, updateProfile, getProfile, uploadProfileImage } = require('../controllers/userController');
const { imageStorage } = require('../config/cloudinary');
const auth = require('../middlewares/auth'); // Authentication middleware

// Multer configuration for image uploads
const upload = multer({ storage: imageStorage });

// Public routes (no authentication required)
router.post('/send-otp', sendOtp);
router.post('/signup', signup);
router.post('/login', login);

// Protected routes (authentication required)
router.get('/profile', auth, getProfile);
router.put('/update-profile', auth, upload.single('profileImage'), updateProfile);
router.post('/upload-image', auth, upload.single('profileImage'), uploadProfileImage);

module.exports = router;