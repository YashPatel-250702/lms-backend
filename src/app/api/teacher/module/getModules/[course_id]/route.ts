import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { getModulesByCourseId } from "@/service/teacherService/module/GetModuleService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{course_id:string}}):Promise<NextResponse> {
   
    try {
        const course_id:string=params.course_id;
        const result=await getModulesByCourseId(course_id);
        return NextResponse.json({message:"Modules fetched successfully",data:result},{status:200});    
        
    } catch (error) {
        if(error instanceof CommonErrorHandler){
            return sendError(error.message, error.statusCode);
        }
        return sendError("Something went wrong while getting modules", 500);
        
    }
}