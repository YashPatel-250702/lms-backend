import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { Course } from "@/models/CourseModel";
import { sendValidationResponse } from "@/responses/ValidationResponse";
import { addCourse, deleteAllInActiveCourses, getAllCourses } from "@/service/teacherService/course/TeacherService";
import { CourseValidation } from "@/shared/validations/courseValidation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.formData();

        const title = data.get("title") as string;
        const description = data.get("description") as string;
        const isActive = data.get("is_active") as string;
        const image = data.get("image" )as File;

        const isActiVe:boolean = isActive.toLowerCase() === "true";

        const teacherId = req.headers.get("x-user-id");
        if (!teacherId) {
            return sendError("Missing teacher ID", 400);
        }
        const course: Course = {
            course_title: title,
            course_description: description,
            is_active: isActiVe,
            teacher_id: teacherId,
            course_imageUrl: "",
        };
        const validatedData = CourseValidation.safeParse(course);
        if (!validatedData.success) {
            return sendValidationResponse(validatedData);
        }
        const createdCourse = await addCourse(course, image);
        
        return NextResponse.json({ message: "Course created successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error in course creation:", error);
        if (error instanceof CommonErrorHandler) { 
            return sendError(error.message, error.statusCode);

        }
        return sendError("Course creation failed", 500);
    }
}

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