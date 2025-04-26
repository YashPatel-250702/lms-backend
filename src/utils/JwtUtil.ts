import { CommonErrorHandler } from "@/errors/Customerror";
import { JWTPayload, SignJWT,jwtVerify } from "jose";

const secretKey=process.env.JWT_SCRETE||"secret"; 
export const generateToken = async (payload:JWTPayload):Promise<string> => {

    const token:string=await new  SignJWT(payload)
         .setProtectedHeader({alg:"HS256"})
         .setIssuedAt().setExpirationTime("24h")
         .sign(new TextEncoder().encode(secretKey));
     return token;
} 

export const verifyToken=async(token:string)=>{
    try {
        const payload=await jwtVerify(token,new TextEncoder().encode(secretKey));
        return payload.payload;
    } catch (error) {
        console.log(error);
        throw new CommonErrorHandler("Invalid Token", 401)
    }
}