export interface User{
    user_id?: number;
    name: string;
    email: string;
    password: string;
    phoneNo:string
    role: string;
    created_at?: Date;
    updated_at?: Date;
}