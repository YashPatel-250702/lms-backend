import { prisma } from "@/lib/Prims-client";
import { ModuleContent } from "@/models/ModuleContentModel";

export const checkExistingContent=async(module_id:string,title:string):Promise<number>=>{
    const contentCount=await prisma.moduleContent.count({
        where:{module_id:module_id,title:title}
    })
    return contentCount;
}

export const addContent=async(content:ModuleContent):Promise<string>=>{
    const result=await prisma.moduleContent.create({
        data:{
            module_id:content.module_id,
            title:content.title ,
            pdf_url:content.pdf_url,
            video_url:content.video_url,
            duration:content.duration
        }
    });
    return result.content_id;   
}