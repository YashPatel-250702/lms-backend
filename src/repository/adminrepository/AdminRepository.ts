import { prisma } from "@/lib/Prims-client";
import { User } from "@/models/User";

export const findAllUsers=async():Promise<User[]>=>{
    const users:User[]=await prisma.users.findMany();
    return users;
}

export const deleteUser=async(user_id:string)=>{
    const user=await prisma.users.delete({where:{user_id:user_id}}); 
    return user; 
}

export const findAccountStatusBydid=async(user_id:string)=>{
    const accountStatus=await prisma.users.findUnique({
        where:{user_id:user_id},
        select:{account_status:true}
    }); 
    return accountStatus;
}
export const suspendUserAccount=async(user_id:string)=>{
    const user=await prisma.users.update({
        where:{user_id:user_id},
        data:{
            account_status:"SUSPENDED"
        }
    }); 
    return user;
}