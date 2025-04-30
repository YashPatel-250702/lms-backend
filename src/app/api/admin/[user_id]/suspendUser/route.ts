import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { suspendUserById } from "@/service/adminService/AdminService";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest,{params}:{params:{user_id:string}}){ 
    try {
        const user_id=params.user_id;
       
        if(!user_id ){
            throw new CommonErrorHandler("Id is requird to suspend user",400);
        }
        const suspendedUser=await suspendUserById(user_id);
        return NextResponse.json({message:"User Suspended Successfully with id: "+user_id},{status:200});
        
    } catch (error) {
        if(error instanceof CommonErrorHandler){
            return sendError(error.message, error.statusCode);
        }
        return sendError("Something went wrong while suspending user", 500);
    }
    
}