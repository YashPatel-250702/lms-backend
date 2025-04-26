import { UUID } from "crypto";

export interface UserLoginResponse{
    user_id:string;
    email:string;
    token:string
    role:string;  
}