import { NextRequest, NextResponse } from "next/server"; 

import { User } from "@/models/User.js";

import { sendValidationResponse } from "@/responses/ValidationResponse";
import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { UserRegisterService } from "@/service/userService/UserRegisterService";
import { UserValidation } from "@/shared/validations/UserValidation";
 
export async function POST(req: NextRequest) {
    try {
        const user:User = await req.json();
        const validatedData =  UserValidation.safeParse(user); 

        if (!validatedData.success) {
            return sendValidationResponse(validatedData);
        }
        const createdUser=await UserRegisterService(user); 
        return NextResponse.json({ message: "User registered successfully"}, { status: 201 });
    } catch (error) {
        console.error("Error in user registration:", error);
        if(error instanceof CommonErrorHandler) {
            return sendError(error.message, error.statusCode);
        }
        return sendError("User registration failed", 500);  
    }
}