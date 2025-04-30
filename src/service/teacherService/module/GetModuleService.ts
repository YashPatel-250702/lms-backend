import { CommonErrorHandler } from "@/errors/Customerror";
import { ExistCourseWithId } from "@/repository/teacherrepository/course/TeacherRepository"
import { findModulesByCourseId } from "@/repository/teacherrepository/module/ModuleRepository";

export const getModulesByCourseId=async(course_id:string)=>{
   const courseCount=await ExistCourseWithId(course_id);
   if(courseCount===0){
       throw new CommonErrorHandler("No course found with id: "+course_id,400)
   }
   const result=await findModulesByCourseId(course_id);
   if(!result||result.length==0){
       throw new CommonErrorHandler("No modules found for courseid: "+course_id,404)
   }
   return result;
}