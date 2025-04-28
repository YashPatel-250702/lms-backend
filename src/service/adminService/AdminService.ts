import { CommonErrorHandler } from "@/errors/Customerror";
import { User } from "@/models/User";
import { deleteUser, findAllUsers } from "@/repository/adminrepository/AdminRepository"
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