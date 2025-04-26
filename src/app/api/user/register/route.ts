
import { NextRequest, NextResponse } from "next/server"; 
import { User } from "@/models/User.js";
import { sendValidationResponse } from "@/responses/ValidationResponse";
import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { UserRegisterService } from "@/service/userService/UserRegisterService";
import { UserValidation } from "@/shared/validations/UserValidation";
/**
 * Registers a new user in the system.
 * @param {NextRequest} req the request.
 * @returns {Promise<NextResponse>} the response.
 * @throws {CommonErrorHandler} if the request is invalid.
 * @throws {Error} if the user registration fails.
 */
export async function POST(req: NextRequest) {
    try {
        const user: User = await req.json();
        const validatedData = UserValidation.safeParse(user); 

        if (!validatedData.success) {
            return sendValidationResponse(validatedData);
        }
        const createdUser = await UserRegisterService(user); 
        if (!createdUser) {
            throw new CommonErrorHandler("User registration failed", 500);
        }
    
        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error in user registration:", error);
        if (error instanceof CommonErrorHandler) {
            return sendError(error.message, error.statusCode);
        }
        return sendError("User registration failed", 500);  
    }
}