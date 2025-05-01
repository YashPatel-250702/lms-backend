import {z} from 'zod';

export const WorkshopValidation = z.object({
  title: z.string().min(3, { message: 'Title is required with minimum 3 characters' }),
  description: z.string().min(10, { message: 'Description is required with minimum 10 characters' }),
  teacher_id: z.string().uuid({ message: 'Teacher ID is missing in headers' }),
  startTime: z.date({ required_error: 'Start time is required' }),
  endTime: z.date({ required_error: 'End time is required' }),
  meeting_link: z.string().url({ message: 'Meeting link must be a valid URL' }).optional(),
  resource_link: z.string().url({ message: 'Resource link must be a valid URL' }).optional(),
  status : z.string().optional().default('REQUESTED_CREATION'),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export type Workshop = z.infer<typeof WorkshopValidation>;
