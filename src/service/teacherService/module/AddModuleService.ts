import { CommonErrorHandler } from "@/errors/Customerror";
import { Module } from "@/models/ModulesModel";
import { existCourseWithId } from "@/repository/teacherrepository/course/TeacherRepository";
import { addModule, existingIndexCount, existingModuleCount } from "@/repository/teacherrepository/module/ModuleRepository";

export const addNewModule=async(module:Module)=>{

    const courseCount=await existCourseWithId(module.course_id);
    if(courseCount==0){
        throw new CommonErrorHandler("No course found with id: "+module.course_id,400)
    }
    const moduleCount=await existingModuleCount(module.course_id,module.title);

    if(moduleCount>0){
        throw new CommonErrorHandler(`Module with title: '${module.title}' already present for course: ${module.course_id}`, 400);
    }
    const indexCount=await existingIndexCount(module.course_id,module.module_index);
    if(indexCount>0){
        throw new CommonErrorHandler(`Module with index: '${module.module_index}' already present for course: ${module.course_id} `,400)
    }


    const result=await addModule(module);
    if(!result){
        throw new CommonErrorHandler("Error while adding module",500)
    }
    return result;

}