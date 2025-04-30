import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { Module } from "@/models/ModulesModel";
import { sendValidationResponse } from "@/responses/ValidationResponse";
import { addNewModule } from "@/service/teacherService/module/AddModuleService";
import { ModuleDataValidation } from "@/shared/validations/ModuleValidation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:{params:{course_id:string}}){

    try {
        const course_id=params.course_id;
        const module:Module=await req.json();
        module.course_id=course_id;
        const validatedData=ModuleDataValidation.safeParse(module);

        if(!validatedData.success){
            return sendValidationResponse(validatedData);
        }
        const createdModule=await addNewModule(validatedData.data);
        return NextResponse.json({message:"Module added successfully"},{status:200});
       
    } catch (error) {
        if(error instanceof CommonErrorHandler){
            return sendError(error.message, error.statusCode);
        }
        return sendError("Module creation failed", 500);
        
    }
    
}