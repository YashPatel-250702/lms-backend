import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { ModuleContent } from "@/models/ModuleContentModel";
import { addModuleContent } from "@/service/teacherService/moduleContent/ModuleContentService";
import { ModuleContentValidation } from "@/shared/validations/ModelContentValidation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:{params:{module_id:string}}){
    try {
        const module_id=params.module_id;
        const formData=await req.formData();
        const title=formData.get("title") as string;
        const duration=formData.get("duration")as string;
        const pdf=formData.get("pdf") as File;
        const video=formData.get("video")as File;

       
        if(!pdf ||pdf.type!=="application/pdf"){
            throw new CommonErrorHandler("Provide valid pdf",400)
        }
        if(!video ||video.type!=="video/mp4"){
            throw new CommonErrorHandler("Provide valid video",400)
        }
        if(!title ||!duration){
            throw new CommonErrorHandler("title and duration is required",400)
        }

        const moduleContent:ModuleContent={
            module_id:module_id,
            title:title,
            duration:duration, 
        }
        const validatedData=ModuleContentValidation.safeParse(moduleContent);

        const uploadedContent=await addModuleContent(moduleContent,pdf,video);
        return NextResponse.json({message:"Module content added successfully"},{status:200});

    } catch (error) {
        if(error instanceof CommonErrorHandler){
            return sendError(error.message, error.statusCode);
        }
        return sendError("Module creation failed", 500);    
    }
}