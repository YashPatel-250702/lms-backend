import z from 'zod';

export const ModuleDataValidation = z.object({
  title: z.string().min(3, "Title should be 3 characters long"),
  course_id: z.string().uuid("Course ID should be a valid UUID"),
  module_index: z.number().int().nonnegative("Module index should be positive integer"),
});
