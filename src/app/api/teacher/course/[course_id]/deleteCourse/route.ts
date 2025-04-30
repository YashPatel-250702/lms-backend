import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { deleteCourseById } from "@/service/teacherService/course/TeacherService";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest,{params}:{params:{course_id:string}}) {
    try {
        const course_id=params.course_id;
    
        if(!course_id){
            throw new CommonErrorHandler("Id is requird to delete course",400);
        }

        const deletedCourse=await deleteCourseById(course_id);
        return NextResponse.json({message:"Course Deleted Successfully with id: "+course_id},{status:200})
        
    } catch (error) {
        if(error instanceof CommonErrorHandler){
            return sendError(error.message,error.statusCode);
        }
        return sendError("Something went wrong while deleting course",500);
        
    }

}