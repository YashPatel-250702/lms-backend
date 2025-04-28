import { CommonErrorHandler } from "@/errors/Customerror";
import { Course } from "@/models/CourseModel";
import { addNewCourse, ExistCourseWithTitle, ExistTeacherWithId } from "@/repository/teacherrepository/TeacherRepository";

export const addCourse = async (course: Course) => {
    
    const existingTeacherCount = await ExistTeacherWithId(course.teacher_id);
    if (existingTeacherCount === 0) {
        throw new CommonErrorHandler("Teacher with this ID does not exist", 400);
    }
        
    const existingCourseCount = await ExistCourseWithTitle(course.teacher_id,course.course_title);
    if (existingCourseCount > 0) {
        throw new CommonErrorHandler("Course with this title already exists", 400);
    }   

    const createdCourse = await addNewCourse(course);
    if (!createdCourse) {
        throw new CommonErrorHandler("Course creation failed", 500);
    }

    return createdCourse;
}
