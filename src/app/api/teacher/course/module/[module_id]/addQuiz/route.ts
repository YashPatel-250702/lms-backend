import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { sendValidationResponse } from "@/responses/ValidationResponse";
import { addQuizService } from "@/service/teacherService/module/QuizService";
import { quizSchema } from "@/shared/validations/QuizValidations";
import { Quiz } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function Post(req:NextRequest,{params}:{params:{module_id:string}}){
    try
    {
        const module_id=params.module_id;
        const quiz:Quiz=await req.json();
        const validateQuiz=quizSchema.safeParse(quiz);
        if(!validateQuiz.success){
            return sendValidationResponse (validateQuiz);
        }   
        const addQuiz=await addQuizService(module_id,quiz);
    }
    catch(error)
    {
        if(error instanceof CommonErrorHandler){
            return sendError(error.message, error.statusCode);
        }
        return sendError("Something went wrong while adding quiz", 500);
    }
}