import { CommonErrorHandler } from "@/errors/Customerror";
import { JWTPayload, SignJWT,jwtVerify } from "jose";

const secretKey=process.env.JWT_SCRETE||"secret"; 
/**
 * Generates a JSON Web Token (JWT) from the given payload. The token is signed with a secret key
 * and has a lifetime of 24 hours.
 *
 * @param payload The payload to include in the JWT.
 * @returns A promise that resolves to the generated JWT.
 */

export const generateToken = async (payload:JWTPayload):Promise<string> => {

    const token:string=await new  SignJWT(payload)
         .setProtectedHeader({alg:"HS256"})
         .setIssuedAt().setExpirationTime("24h")
         .sign(new TextEncoder().encode(secretKey));
     return token;
} 

/**
 * Verifies the given JWT and returns the payload if it is valid.
 *
 * @param token The JWT to verify.
 * @returns A promise that resolves to the payload if the token is valid.
 * @throws {CommonErrorHandler} If the token is invalid.
 */
export const verifyToken=async(token:string)=>{
    try {
        const payload=await jwtVerify(token,new TextEncoder().encode(secretKey));
        return payload.payload as JWTPayload;
    } catch (error) {
        console.log(error);
        throw new CommonErrorHandler("Invalid Token Or Token Expired", 401)
    }
}