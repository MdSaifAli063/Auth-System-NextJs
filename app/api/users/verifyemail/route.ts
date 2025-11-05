import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";



connect()


export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);

        // Find users with valid verifyTokenExpiry
        const users = await User.find({
            verifyTokenExpiry: {$gt: Date.now()}
        });

        // Compare token with hashed tokens stored in database
        let user = null;
        for (const u of users) {
            if (u.verifyToken && await bcryptjs.compare(token, u.verifyToken)) {
                user = u;
                break;
            }
        }

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log(user);

        user.isVerfied = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}