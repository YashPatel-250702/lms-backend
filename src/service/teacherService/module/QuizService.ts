import { CommonErrorHandler } from "@/errors/Customerror";

import { addQuiz, verfyQuizNameExists } from "@/repository/teacherrepository/module/QuizRepository";
import { Quiz } from "@/models/Quiz";
import { checkModuleWithId } from "@/repository/teacherrepository/module/ModuleRepository";





export const addQuizService=async(module_id:string,quiz:Quiz)=>{



    const existungModuleCount=await checkModuleWithId(module_id);
    if(existungModuleCount==0){
        throw new CommonErrorHandler("Module with id: "+module_id+" does not exist",400)
    }
    console.log("Adding new quiz: ",quiz);
    const quizName=quiz.quiz_name.trim();
    quiz.quiz_name=quizName;
    console.log("Verifying if quiz with name: "+quizName+" already exists in this  module ")
    const quizNameExists=await verfyQuizNameExists(module_id,quizName);
    console.log("Exists: ",quizNameExists);
    if(quizNameExists){
        throw new CommonErrorHandler("Quiz with name: "+quizName+" already exists in this  module ",400)
    }
    console.log("Adding quiz to database");
    const result=await addQuiz(quiz);
    console.log("Added quiz: ",result);
    return result;
}
