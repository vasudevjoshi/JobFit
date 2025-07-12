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
        const htmlContent = `
        <div style="background:linear-gradient(135deg,#e0e7ff 0%,#fbc2eb 100%);padding:40px 0;">
          <div style="max-width:480px;margin:40px auto;background:#fff;border-radius:16px;box-shadow:0 4px 24px rgba(80,80,180,0.08);padding:32px 24px 28px 24px;font-family:'Segoe UI',Arial,sans-serif;">
            <div style="text-align:center;">
              <img src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png" alt="Verify" width="64" style="margin-bottom:16px;" />
              <h2 style="color:#2d3748;font-size:2rem;margin-bottom:8px;">Verify Your Account</h2>
              <p style="color:#4b5563;font-size:1rem;margin-bottom:24px;">
                Thank you for signing up! Please use the OTP below to verify your email address.
              </p>
              <div style="display:inline-block;background:#f3f4f6;padding:18px 36px;border-radius:12px;margin-bottom:24px;">
                <span style="font-size:2.2rem;letter-spacing:0.3em;color:#2563eb;font-weight:700;">${otp}</span>
              </div>
              <p style="color:#6b7280;font-size:0.95rem;margin-top:18px;">
                This OTP is valid for <b>5 minutes</b>. If you did not request this, please ignore this email.
              </p>
              <hr style="margin:32px 0 18px 0;border:none;border-top:1px solid #e5e7eb;">
              <div style="color:#9ca3af;font-size:0.9rem;">
                &copy; ${new Date().getFullYear()} JobFit. All rights reserved.
              </div>
            </div>
          </div>
        </div>
        `;
        const isMailSent = await mailSender(
            email,
            'Your JobFit Email Verification Code',
            htmlContent
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