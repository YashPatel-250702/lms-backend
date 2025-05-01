import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { Quiz } from "@/models/Quiz";
import { sendValidationResponse } from "@/responses/ValidationResponse";
import { addQuizService } from "@/service/teacherService/module/QuizService";
import { quizSchema } from "@/shared/validations/QuizValidations";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:{params:{module_id:string}}){
    try
    {
        const module_id=params.module_id;
        const quiz:Quiz=await req.json();
        quiz.module_id=module_id;
        const validateQuiz=quizSchema.safeParse(quiz);
        if(!validateQuiz.success){
            return sendValidationResponse (validateQuiz);
        }   
        const addQuiz=await addQuizService(module_id,quiz);
        return NextResponse.json({ message: "Quiz is created successfully" }, { status: 201 });
    }
    catch(error)
    {
        if(error instanceof CommonErrorHandler){
            return sendError(error.message, error.statusCode);
        }
        return sendError("Something went wrong while adding quiz: "+error, 500);
    }
}