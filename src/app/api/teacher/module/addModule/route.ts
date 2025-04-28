import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

    try {
        
    } catch (error) {
        if(error instanceof CommonErrorHandler){
            return sendError(error.message, error.statusCode);
        }
        return sendError("Module creation failed", 500);
        
    }
    
}