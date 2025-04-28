import { prisma } from "@/lib/Prims-client";
import { Module } from "@/models/ModulesModel";

export const existingModuleCount=async(course_id:string,title:string):Promise<number>=>{

    const moduleCount:number=await prisma.modules.count({
        where:{course_id:course_id,
               title:title
        }
    });
    return moduleCount;
}


export const addModule=async(module:Module):Promise<string>=>{
    const result=await prisma.modules.create({
        data:{
            course_id:module.course_id,
            title:module.title,
            module_index:module.module_index
        }
    });
    return result.module_id;
}