import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { deleteUserById } from "@/service/adminService/AdminService";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest,{params}:{params:{user_id:string}}):Promise<NextResponse>{
    try {
        const id=params.user_id;
        if(!id){
            throw new CommonErrorHandler("Id is requird to delete user",400);
        }

        const deletedUser=await deleteUserById(id);
        return NextResponse.json({message:"User Deleted Successfully with id: "+id},{status:200});
        
    } catch (error) {
        if(error instanceof CommonErrorHandler){
            return sendError(error.message,error.statusCode);
        }
        return sendError("Something went wrong while deleting user",500);
        
    }

}