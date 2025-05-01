import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { getAllQuizzesbyModuleId } from "@/service/teacherService/module/QuizService";
import { NextRequest, NextResponse } from "next/server";




export async function GET(req:NextRequest,{params}:{params:{module_id:string}}) 
{
    try{

        const module_id=params.module_id;
        const quizzes=await getAllQuizzesbyModuleId(module_id);
        return NextResponse.json({message:"Quizzes fetched successfully",quizzes:quizzes},{status:200});

    }
    catch(error)
    {
        if(error instanceof CommonErrorHandler)
        {
            return sendError(error.message, error.statusCode);
        }
        return sendError("Something went wrong fettchinfg all quizzes : "+error, 500);
    }

    
}