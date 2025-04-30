import { addQuiz } from "@/repository/teacherrepository/module/QuizRepository";
import { Quiz } from "@prisma/client";




export const addQuizService=async(module_id:string,quiz:Quiz):Promise<Quiz>=>{
    const result=await addQuiz(module_id,quiz);
    return result;
}