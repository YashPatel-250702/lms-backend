import { CommonErrorHandler } from "@/errors/Customerror";
import { Module } from "@/models/ModulesModel";
import { addModule, existingModuleCount } from "@/repository/teacherrepository/module/ModuleRepository";

export const addNewModule=async(module:Module)=>{

    const moduleCount=await existingModuleCount(module.course_id,module.title);

    if(moduleCount>0){
        throw new CommonErrorHandler("Module with title already present for course: "+module.course_id,400)
    }

    const result=await addModule(module);
    if(!result){
        throw new CommonErrorHandler("Error while adding module",500)
    }
    return result;

}