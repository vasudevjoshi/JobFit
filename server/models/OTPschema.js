const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const otpSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now, // <-- use Date.now (not Date.now())
        expires: 30000
    }
});

async function sendVerificationEmail(email, otp) {
    try {
        const isMailSent = await mailSender(
            email,
            'OTP Verification',
            `<h1>Use the OTP to verify your account</h1><h2>OTP is: ${otp}</h2>`
        );
        if (isMailSent)
            console.log("Mail Sent Successfully", isMailSent);
        else
            console.log("Mail Not Sent");
    } catch (error) {
        console.log(error.message);
    }
}

otpSchema.pre("save", async function (next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
});

module.exports = mongoose.model('OTP', otpSchema);