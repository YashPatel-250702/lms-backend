import { HTTP_METHODS } from "../constants/HttpMethods";
import { ROLES } from "../constants/ROLES";
import { API_PATHS } from "./APIPaths";

export const API_PATH_PERMISSION: Record<string, any>={

    [HTTP_METHODS.POST]:{
        [API_PATHS.USER_LOGIN]:[
            ROLES.ADMIN,
            ROLES.STUDENT,
            ROLES.TEACHER
        ],
        [API_PATHS.USER_REGISTER]:[
            ROLES.ADMIN,
            ROLES.STUDENT,
            ROLES.TEACHER
        ],
        [API_PATHS.ADD_NEW_COURSE]:[
            ROLES.ADMIN,
            ROLES.TEACHER
        ]
    }
}