import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { getCourseById } from "@/service/teacherService/course/TeacherService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{course_id:string}}){
    try {
        const course_id=params.course_id;
        const course=await getCourseById(course_id);
        return NextResponse.json({message:"Course fetched successfully",course:course},{status:200});
    } catch (error) {
        if(error instanceof CommonErrorHandler)
            sendError(error.message,error.statusCode);

        sendError("Something went wrong while getting course",500);    
    }
    
}