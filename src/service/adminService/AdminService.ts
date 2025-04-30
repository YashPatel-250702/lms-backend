import { CommonErrorHandler } from "@/errors/Customerror";
import { User } from "@/models/User";
import { deleteUser, findAccountStatusBydid, findAllUsers, suspendUserAccount } from "@/repository/adminrepository/AdminRepository"
import { checkUserById } from "@/repository/userrepository/UserRepository";

export const getALlUsers= async ():Promise<User[]> => {
    const users:User[]=await findAllUsers();
    if(!users||users.length==0) {
        throw new CommonErrorHandler("Users not found", 404);
    }
    return users;
}

export const deleteUserById=async(userId:string)=>{
    const userCount=await checkUserById(userId);
    if(userCount==0){
        throw new CommonErrorHandler("User Not Found with id: "+userId,404);
    }
    const deletedUser=await deleteUser(userId);
    if(!deletedUser){
        throw new CommonErrorHandler("Error While Deleting user",500);
    }
    return deletedUser;
}

export const suspendUserById=async(userId:string)=>{
    const userCount=await checkUserById(userId);
    if(userCount==0){
        throw new CommonErrorHandler("User Not Found with id: "+userId,404);
    }
    const userStatus=await findAccountStatusBydid(userId);
    if(userStatus&&userStatus.account_status==="SUSPENDED"){
        throw new CommonErrorHandler("User Already Suspended with id: "+userId,400);
    }
    const suspendedUser=await suspendUserAccount(userId);
    if(!suspendedUser){
        throw new CommonErrorHandler("Error While Suspending user",500);
    }
    return suspendedUser;
}