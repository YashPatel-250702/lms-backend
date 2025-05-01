import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { getModuleById } from "@/service/teacherService/module/GetModuleService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req:NextRequest,{params}:{params:{module_id:string}}) {
    try {
        const module_id=params.module_id;
        if(!module_id){
            throw new CommonErrorHandler("Module id is required",400)
        }
        const module=await getModuleById(module_id);
        return NextResponse.json({message:"Module fetched successfully",module:module},{status:200});
        
    } catch (error) {
        if(error instanceof CommonErrorHandler){
            return sendError(error.message, error.statusCode);
        }
        return sendError("Something went wrong while getting module", 500);
        
    }
    
}