import { CommonErrorHandler } from "@/errors/Customerror";
import { User } from "@/models/User";
import { exisrtingUserWithEmail, UserRegister } from "@/repository/userrepository/UserRepository";
import bcrypt from "bcrypt";
import { sendMail } from "../mailSender";
import EmailModel from "@/models/Email";
import { RegistrationSuccessEmail } from "@/shared/constants/EmailMessages";

/**
 * Registers a user in the database.
 *
 * @param user - The user data to register.
 * @throws {CommonErrorHandler} If the email already exists.
 * @throws {CommonErrorHandler} If registration fails.
 * @returns A promise that resolves to the newly registered user.
 */

export const UserRegisterService = async (user: User) => {
    const existingUserCount = await exisrtingUserWithEmail(user.email);
    if (existingUserCount > 0) {
        throw new CommonErrorHandler("User with this email already exists", 400);
    }
    
    user.role=user.role? user.role : "STUDENT";

    user.password=await bcrypt.hash(user.password, 10);

    const userData = await UserRegister(user);

    if (!userData) {
        throw new CommonErrorHandler("User registration failed", 500);
    }

    const emailModel:EmailModel = {
      toEmail: user.email,
      subject: "Welcome to bitLabs LMS – Registration Successful",
      message:  RegistrationSuccessEmail(user.name),
   };
    await sendMail(emailModel); 
    return userData;
}