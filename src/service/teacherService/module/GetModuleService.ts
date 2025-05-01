import { CommonErrorHandler } from "@/errors/Customerror";
import { ExistCourseWithId } from "@/repository/teacherrepository/course/TeacherRepository"
import { checkModuleWithId, findAllModules, findModuleById, findModulesByCourseId } from "@/repository/teacherrepository/module/ModuleRepository";

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
export const getModuleById=async(module_id:string)=>{
    const moduleCount=await checkModuleWithId(module_id);
    if(moduleCount==0){
        throw new CommonErrorHandler("No module found with id: "+module_id,400)
    }
    const result=await findModuleById(module_id);
    if(!result){
        throw new CommonErrorHandler("No modules found for moduleid: "+module_id,404)
    }
    return result;
}

export const getAllModules=async()=>{
    const result=await findAllModules();
    if(!result||result.length==0){
        throw new CommonErrorHandler("No modules found",404)
    }
    return result;
}