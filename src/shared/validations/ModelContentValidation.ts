
import z from 'zod';

export const ModuleContentValidation = z.object({
    module_id: z.string().uuid("Module ID should be a valid UUID"),
    title: z.string().min(3, "Title should be 3 characters long"),
    duration: z.string(),
}); 