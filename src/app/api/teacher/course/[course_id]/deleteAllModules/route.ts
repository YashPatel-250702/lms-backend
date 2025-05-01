import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { deleteModuleByCourse } from "@/service/teacherService/module/DeleteModuleService";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest,{params}:{params:{course_id:string}},) {
    try {
        const course_id=params.course_id;
        if(!course_id){
            throw new CommonErrorHandler("Id is requird to delete course",400);
        }
        const teacherId = req.headers.get("x-user-id")||"";
        const userRole = req.headers.get("x-user-role")||"";
        const deletedModules=await deleteModuleByCourse(course_id,teacherId,userRole);
        return NextResponse.json({message:"Modules Deleted Successfully with course id: "+course_id},{status:200});
        
    } catch (error) {
        if(error instanceof CommonErrorHandler){
            return sendError(error.message, error.statusCode);
        }
        return sendError("Something went wrong while deleting module", 500);
        
    }
    
}