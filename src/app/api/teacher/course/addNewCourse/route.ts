import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { Course } from "@/models/CourseModel";
import { sendValidationResponse } from "@/responses/ValidationResponse";
import { addCourse } from "@/service/teacherService/TeacherService";
import { CourseValidation } from "@/shared/validations/courseValidation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
       
        const course:Course = await req.json();
        const teacherId =  req.headers.get("x-user-id") as string;
        console.log("Teacher ID from header:", teacherId);
        course.teacher_id = teacherId; 
        const validatedData = CourseValidation.safeParse(course); 

        
        if (!validatedData.success) {
            return sendValidationResponse(validatedData);
        }

        const createdCourse = await addCourse(course);    

        if (!createdCourse) {
            throw new CommonErrorHandler("Course creation failed", 500);
        }

        return NextResponse.json({ message: "Course created successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error in course creation:", error);
        if (error instanceof CommonErrorHandler) {
            return sendError(error.message, error.statusCode);
        }
        return sendError("Course creation failed", 500);  
    }
}