
import z from 'zod';

export const UserValidation = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 6 characters long' }).regex(/(?=.*[a-z])(?=[A-Z])(?=.*[^a-zA-Z0-9])/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' }),
    ph_no: z.string().min(10, { message: 'Phone number must be at least 10 digits long' }).regex(/^\d+$/, { message: 'Phone number must contain only digits' })
});
