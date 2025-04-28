import z from 'zod';

export const CourseValidation = z.object({
    course_title: z.string().min(3, { message: 'Course title is required with minimum 3 character' }),
    course_description: z.string().min(10, { message: 'Course description is required with minimum 10 character' }),
    course_imageUrl: z.string().url({ message: 'Invalid URL format' }),
    is_active: z.boolean()
});