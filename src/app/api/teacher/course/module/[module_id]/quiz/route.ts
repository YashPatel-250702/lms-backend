import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { NextRequest, NextResponse } from "next/server";

export async function Post(req:NextRequest){
    try
    {
        
    }
    catch(error)
    {
        if(error instanceof CommonErrorHandler){
            return sendError(error.message, error.statusCode);
        }
        return sendError("Something went wrong while adding quiz", 500);
    }
}