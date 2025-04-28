import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { User } from "@/models/User";
import { getALlUsers } from "@/service/adminService/AdminService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        const users:User[]=await getALlUsers();
        return NextResponse.json({ message: "Users fetched successfully",data:users }, { status: 200 });
        
    } catch (error) {
        if(error instanceof CommonErrorHandler){
            return sendError(error.message, error.statusCode);
        }
        return sendError("Something went wrong while getting all users", 500);
    }
    
}