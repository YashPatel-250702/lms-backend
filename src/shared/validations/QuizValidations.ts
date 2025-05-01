import { z } from "zod";

export const quizSchema = z.object({
  module_id: z.string().uuid({ message: "Invalid module ID" }),
  quiz_name: z.string().min(3, "Quiz name must be at least 3 characters"),
  duration: z.string().nonempty("Duration is required"),
  number_of_questions: z.number().int().min(1, "Must have at least 1 question"),
//   questions: z
//     .array(
//       z.object({
//         question: z.string().min(5, "Question must be at least 5 characters"),
//         options: z.record(z.string(), z.string()).refine(
//           (opts) => Object.keys(opts).length >= 2,
//           { message: "At least two options are required" }
//         ),
//         answer: z.string().min(1, "Answer is required"),
//       })
//     )
//     .optional(),
});