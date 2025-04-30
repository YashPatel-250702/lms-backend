import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { getAllCourses } from "@/service/teacherService/course/TeacherService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const courses = await getAllCourses();
        return NextResponse.json({message:"Courses fetched successfully",courses:courses},{status:200});
    } catch (error) {
        if (error instanceof CommonErrorHandler) {
            return sendError(error.message, error.statusCode);
        }
        return sendError("Something went wrong while getting all courses", 500);
    }
}