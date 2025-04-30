import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { deleteAllInActiveCourses } from "@/service/teacherService/course/TeacherService";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const courses = await deleteAllInActiveCourses();
        return NextResponse.json({ message: "All In-Active courses deleted successfully", courses: courses }, { status: 200 });
    } catch (error) {
        if (error instanceof CommonErrorHandler) {
            return sendError(error.message, error.statusCode);
        }
        return sendError("Something went wrong while deleting all courses", 500);
    }
}