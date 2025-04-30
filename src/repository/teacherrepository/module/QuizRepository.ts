
import { prisma } from "@/lib/Prims-client";
import { Quiz } from "@prisma/client";


type QuizInput = Omit<Quiz, "quiz_id" | "created_at" | "updated_at" | "module_id">;

export const addQuiz = async (module_id: string, quiz: QuizInput): Promise<Quiz> => {
  const result = await prisma.quiz.create({
    data: {
      ...quiz,
      module_id, 
    },
  });
  return result;
};