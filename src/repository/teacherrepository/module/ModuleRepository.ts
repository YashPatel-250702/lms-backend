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
export const existingIndexCount=async(course_id:string,module_index:number):Promise<number>=>{

    const indexCount:number=await prisma.modules.count({
        where:{course_id:course_id,
               module_index:module_index
            }
    });
    return indexCount;
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

export const checkModuleWithId=async(module_id:string):Promise<number>=>{
    const moduleCount=await prisma.modules.count({    
        where:{module_id:module_id} 
    });
    return moduleCount;
}

export const findModulesByCourseId=async(course_id:string)=>{
    const result=await prisma.modules.findMany({
        where:{course_id:course_id},
        include:{contents:true}
    })
    return result;
}

export const findModuleById=async(module_id:string)=>{
    const result=await prisma.modules.findUnique({
        where:{module_id:module_id},
        include:{contents:true}
    })
    return result;
}



export const findAllModules=async()=>{
    const result=await prisma.modules.findMany();
    return result;
}

export const deleteModuleByCourseId=async(course_id:string)=>{
    const result=await prisma.modules.deleteMany({
        where:{course_id:course_id}
    
    })
    return result;
}

export const deleteModuleByModuleId=async(module_id:string)=>{
    const result=await prisma.modules.deleteMany({
        where:{module_id:module_id}
    
    })
    return result;
}