import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { UserLoginResponse } from "@/responses/JwtResponse";
import { userLoginService } from "@/service/userService/UserLoginService";
import { NextRequest, NextResponse } from "next/server";

/**
 * Logs in a user with the given email and password.
 *
 * @param req - The request object which contains the email and password in the request body.
 *
 * @returns A JSON response containing a success message, a 200 status code, and a JWT response containing the user's ID, email, and role on successful login.
 *          Sends a JSON response with an error message and a 400 or 500 status code on login failure.
 */
export async function POST(req:NextRequest):Promise<NextResponse> {
    try {
        const {email,password}=await req.json();
        if(!email || !password){    
            return sendError("Email and password are required", 400);
        }
        const loginResponse:UserLoginResponse=await userLoginService(email,password);

        return NextResponse.json({ message: "User logged in successfully",data:loginResponse}, { status: 200 });
        
    } catch (error) {
        if(error instanceof CommonErrorHandler){
            return sendError(error.message, error.statusCode);
        }
        return sendError("User login failed", 500);
        
    }
    
}