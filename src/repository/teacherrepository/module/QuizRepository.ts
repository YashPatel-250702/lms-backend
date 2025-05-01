
import { prisma } from "@/lib/Prims-client";
import { Quiz } from "@/models/Quiz";
import {Quiz as QUIZ} from "@prisma/client"


export const addQuiz = async (quiz: Quiz): Promise<Quiz> => {
  const result = await prisma.quiz.create({
    data: {
      module_id: quiz.module_id,
      quiz_name: quiz.quiz_name,
      duration: quiz.duration,
      number_of_questions: quiz.number_of_questions,
      
    },
  });
  return result;
};


export const verfyQuizNameExists=async(module_id:string,quiz_name:string):Promise<boolean>=>{
    const result=await prisma.quiz.findFirst({
        where:{module_id:module_id,quiz_name:quiz_name},
        select:{quiz_name:true}
    })
    return !!result;
}



export const findAllQuizsByModuleId=async(module_id:string):Promise<Quiz[]>=>{
    const result=await prisma.quiz.findMany({
        where:{module_id:module_id},
        select:
        {
          module_id:true,
          quiz_name:true,
          duration:true,
          number_of_questions:true,
          created_at:true,
          updated_at:true
        }
    })
    return result;
}
