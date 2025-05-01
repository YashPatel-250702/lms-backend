import { CommonErrorHandler } from "@/errors/Customerror";
import { findCourseById } from "@/repository/teacherrepository/course/TeacherRepository";
import { checkModuleWithId, deleteModuleByCourseId, deleteModuleByModuleId, findModulesByCourseId } from "@/repository/teacherrepository/module/ModuleRepository";

export const deleteModuleByCourse=async(course_id:string,teacher_id:string,userROle:string)=>{
  
    const course=await findCourseById(course_id);
    if(!course){
        throw new CommonErrorHandler("No course found with id: "+course_id,400)
    }
    
    const existingModule=await findModulesByCourseId(course_id);
    if(existingModule===null||existingModule.length==0){
        throw new CommonErrorHandler("No Module found with course id: "+course_id,400);
    }
    if (course.teacher_id !== teacher_id && userROle !== "ADMIN") {
        throw new CommonErrorHandler("Only Course Owner Or Admin can delete All Modules", 403);
    }

    const result=await deleteModuleByCourseId(course_id);
    if(!result){
        throw new CommonErrorHandler("Error while deleting module",500)
    }

    return result;
}

export const deleteModuleById=async(module_id:string)=>{
    const moduleCount=await checkModuleWithId(module_id);

    if(moduleCount==0){
        throw new CommonErrorHandler("No module found with id: "+module_id,400)
    }

    const result=await deleteModuleByModuleId(module_id);
    if(!result){
        throw new CommonErrorHandler("Error while deleting module",500)
    }
    return result;
}