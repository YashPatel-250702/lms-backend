import { prisma } from "@/lib/Prims-client";
import { Course } from "@/models/CourseModel";



export const ExistCourseWithTitle = async (teacher_id: string,title: string): Promise<number> => {
    const count = await prisma.courses.count({
        where: {
            teacher_id: teacher_id,
            title: title,
        },
    });
    return count;
}
   

export const ExistTeacherWithId = async (teacher_id: string): Promise<number> => {
    const count = await prisma.users.count({
        where: {
            user_id: teacher_id,
            OR: [
                { role: "TEACHER" },
                { role: "ADMIN" }
            ]
        },
    });
    return count;
}


export const addNewCourse = async (course: Course) => {
    const courseData = await prisma.courses.create({
        data: {
            title: course.course_title,
            description: course.course_description,
            image_url: course.course_imageUrl,
            is_active: course.is_active,
            teacher_id: course.teacher_id,
        },
    });
    return courseData;
}