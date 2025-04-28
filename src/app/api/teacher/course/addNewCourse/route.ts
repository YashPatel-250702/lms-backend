import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { Course } from "@/models/CourseModel";
import { sendValidationResponse } from "@/responses/ValidationResponse";
import { addCourse } from "@/service/teacherService/course/TeacherService";
import { CourseValidation } from "@/shared/validations/courseValidation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.formData();

        const title = data.get("title");
        const description = data.get("description");
        const isActive = data.get("is_active");
        const image = data.get("image");
       

        if (!(image instanceof File) || !image.name) {
            return sendError("Image file is required", 400);
        }
        if (typeof title !== "string" || typeof description !== "string" || typeof isActive !== "string") {
            return sendError("Invalid form data", 400);
        }

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
