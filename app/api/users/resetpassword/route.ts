import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token, password} = reqBody

        if (!token || !password) {
            return NextResponse.json({error: "Token and password are required"}, {status: 400})
        }

        if (password.length < 6) {
            return NextResponse.json({error: "Password must be at least 6 characters"}, {status: 400})
        }

        // Find users with valid forgotPasswordTokenExpiry
        const users = await User.find({
            forgotPasswordTokenExpiry: {$gt: Date.now()}
        });

        // Compare token with hashed tokens stored in database
        let user = null;
        for (const u of users) {
            if (u.forgotPasswordToken) {
                const isValid = await bcryptjs.compare(token, u.forgotPasswordToken);
                if (isValid) {
                    user = u;
                    break;
                }
            }
        }

        if (!user) {
            return NextResponse.json({error: "Invalid or expired token"}, {status: 400})
        }

        // Hash new password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Update user password and clear reset token
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();
        
        return NextResponse.json({
            message: "Password reset successfully",
            success: true
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

