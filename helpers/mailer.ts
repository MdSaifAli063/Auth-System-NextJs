import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';


export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // Validate required environment variables
        if (!process.env.DOMAIN) {
            throw new Error("DOMAIN environment variable is not set");
        }

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

        const resetUrl = emailType === "VERIFY" 
            ? `${process.env.DOMAIN}/verifyemail?token=${token}`
            : `${process.env.DOMAIN}/resetpassword?token=${token}`;
        
        const subject = emailType === "VERIFY" 
            ? "Verify your email" 
            : "Reset your password";
        
        const actionText = emailType === "VERIFY" 
            ? "verify your email" 
            : "reset your password";

        // Development mode: Skip email sending if SMTP not configured
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        const isDevelopment = process.env.NODE_ENV === "development";

        if (!smtpUser || !smtpPass) {
            if (isDevelopment) {
                // In development, log the token instead of sending email
                console.log("\n" + "=".repeat(80));
                console.log(`📧 ${emailType === "VERIFY" ? "EMAIL VERIFICATION" : "PASSWORD RESET"} EMAIL (Development Mode)`);
                console.log("=".repeat(80));
                console.log(`To: ${email}`);
                console.log(`Subject: ${subject}`);
                console.log(`\n🔗 ${actionText.charAt(0).toUpperCase() + actionText.slice(1)} Link:`);
                console.log(resetUrl);
                console.log("\n📝 Token (for testing):");
                console.log(token);
                console.log("=".repeat(80) + "\n");
                // Return a mock response
                return {
                    messageId: "dev-mode-mock-id",
                    accepted: [email],
                    rejected: [],
                    pending: [],
                    response: "Development mode: Email not sent"
                };
            } else {
                throw new Error("SMTP credentials are not configured. Please set SMTP_USER and SMTP_PASS environment variables.");
            }
        }

        // Production mode: Send actual email
        const smtpHost = process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io";
        const smtpPort = parseInt(process.env.SMTP_PORT || "2525");

        var transport = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            auth: {
              user: smtpUser,
              pass: smtpPass
            }
          });

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

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error:any) {
        // Provide more user-friendly error messages
        if (error.message.includes("Invalid credentials") || error.message.includes("535")) {
            throw new Error("SMTP authentication failed. Please check your SMTP_USER and SMTP_PASS environment variables.");
        }
        if (error.message.includes("ECONNREFUSED") || error.message.includes("ETIMEDOUT")) {
            throw new Error("Could not connect to SMTP server. Please check your SMTP_HOST and SMTP_PORT settings.");
        }
        throw new Error(`Failed to send email: ${error.message}`);
    }
}