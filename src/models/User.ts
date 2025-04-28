type UserRole = 'ADMIN' | 'STUDENT' | 'TEACHER';

export interface User{
    user_id: string;
    name: string;
    email: string;
    password: string;
    ph_no:string|null;
    role: UserRole;
    account_status:string
    created_at?: Date;
    updated_at?: Date|null;
}