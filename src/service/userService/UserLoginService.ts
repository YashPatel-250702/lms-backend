import { CommonErrorHandler } from "@/errors/Customerror";
import { findUserByEmail } from "@/repository/userrepository/UserRepository"
import { UserLoginResponse } from "@/responses/JwtResponse";
import { generateToken } from "@/utils/JwtUtil";
import bcrypt from "bcrypt";
import { JWTPayload } from "jose";
/**
 * Authenticates a user with the given email and password.
 *
 * @param email - The email address to authenticate with.
 * @param password - The password to authenticate with.
 * @throws {CommonErrorHandler} If the user is not found.
 * @throws {CommonErrorHandler} If the password does not match.
 * @returns A promise that resolves to a JWT response containing the user's ID, email, and role.
 */

export const userLoginService = async (email: string, password: string) => {

    const user=await findUserByEmail(email);
    if (!user) {
        throw new CommonErrorHandler("User not found with email", 404);
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new CommonErrorHandler("Invalid password", 400);
    }

    if(user.account_status!=="ACTIVE") {
        throw new CommonErrorHandler("User Account is not active", 401);
    }

    const payload:JWTPayload={
        user_id:user.user_id,
        email:user.email,
        role:user.role
    }
    const token=await generateToken(payload);

    const loginResponse:UserLoginResponse={
        user_id:user.user_id,email
        :user.email,
        token:token,
        role:user.role
    };
    return loginResponse;
}   