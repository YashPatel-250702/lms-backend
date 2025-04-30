

/**
 * Checks if a user with the given email exists in the database.
 *
 * @param email - The email address to check for existence.
 * @returns A promise that resolves to the number of users with the given email.
 */

import { prisma } from "@/lib/Prims-client";
import { User } from "@/models/User";

export const exisrtingUserWithEmail = async (email: string):Promise<number> => {
    const count = await prisma.users.count(
        { where: { email:email } });
    return count ;
}


/**
 * Registers a user in the database.
 *
 * @param user - The user data to register.
 * @returns A promise that resolves to the newly registered user.
 */

export const checkUserById=async(userId:string)=>{
    const userCount=await prisma.users.count({
        where:{user_id:userId}
    })

    return userCount;
}
export const findUserById=async(userId:string)=>{
    const userCount=await prisma.users.findUnique({
        where:{user_id:userId}
    })

    return userCount;
}
export const UserRegister = async (user: User) => {
    const userData = await prisma.users.create({
        data: {
            name: user.name,
            email: user.email,
            password: user.password,
            ph_no:user.ph_no,
            role: user.role,
        },
    });
    return userData;
}

/**
 * Finds a user by their email in the database.
 *
 * @param email - The email address to search for.
 * @returns A promise that resolves to the user if found, or null if not found.
 */
export const findUserByEmail=async(email:string)=>{
    const user=await prisma.users.findUnique({where:{email:email}});
    return user;
}   