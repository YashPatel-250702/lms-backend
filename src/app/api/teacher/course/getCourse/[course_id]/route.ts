import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { getCourseById } from "@/service/teacherService/course/TeacherService";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest,{params}:{params:{course_id:string}}) {
    try {
        const course_id = params.course_id;
        if (!course_id) {
           throw new CommonErrorHandler("Course ID is required",  400 );
        }

        // Assuming you have a function to get the course by ID
        const course = await getCourseById(course_id);

        return new Response(JSON.stringify(course), { status: 200 });
    } catch (error) {
         if(error instanceof CommonErrorHandler){
                   return sendError(error.message,error.statusCode);
               }
               return sendError("Something went wrong while deleting course",500);
    }
}