
import { NextRequest, NextResponse } from "next/server"; 
import { User } from "@/models/User.js";
import { sendValidationResponse } from "@/responses/ValidationResponse";
import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { UserRegisterService } from "@/service/userService/UserRegisterService";
import { UserValidation } from "@/shared/validations/UserValidation";
/**
 * Registers a new user with the given email, password, and name.
 *
 * @param req - The request object which contains the email, password, and name in the request body.
 *
 * @returns A JSON response containing a success message and a 201 status code on successful user registration.
 *          Sends a JSON response with an error message and a 400 or 500 status code on registration failure.
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