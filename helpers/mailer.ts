import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';


export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a secure random token
        const token = crypto.randomBytes(32).toString("hex");
        const hashedToken = await bcryptjs.hash(token, 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        var transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
            port: parseInt(process.env.SMTP_PORT || "2525"),
            auth: {
              user: process.env.SMTP_USER || "3fd364695517df",
              pass: process.env.SMTP_PASS || "7383d58fd399cf"
            }
          });


        const resetUrl = emailType === "VERIFY" 
            ? `${process.env.DOMAIN}/verifyemail?token=${token}`
            : `${process.env.DOMAIN}/resetpassword?token=${token}`;
        
        const subject = emailType === "VERIFY" 
            ? "Verify your email" 
            : "Reset your password";
        
        const actionText = emailType === "VERIFY" 
            ? "verify your email" 
            : "reset your password";

        const mailOptions = {
            from: 'noreply@authsystem.com',
            to: email,
            subject: subject,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #202124; font-size: 24px; margin-bottom: 20px;">${subject}</h2>
                    <p style="color: #5f6368; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
                        Click the button below to ${actionText}:
                    </p>
                    <a href="${resetUrl}" 
                       style="display: inline-block; background-color: #1a73e8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500; margin-bottom: 20px;">
                        ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
                    </a>
                    <p style="color: #5f6368; font-size: 12px; line-height: 1.6; margin-top: 20px;">
                        Or copy and paste this link into your browser:<br>
                        <a href="${resetUrl}" style="color: #1a73e8; word-break: break-all;">${resetUrl}</a>
                    </p>
                    <p style="color: #5f6368; font-size: 12px; margin-top: 20px;">
                        This link will expire in 1 hour. If you didn't request this, please ignore this email.
                    </p>
                </div>
            `
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}