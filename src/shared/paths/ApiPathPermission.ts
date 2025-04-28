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
        ]
    },

    [HTTP_METHODS.GET]:{
        [API_PATHS.SEE_ALL_USERS]:[ 
            ROLES.ADMIN
        ],
    }
    ,
    [HTTP_METHODS.DELETE]:{
        [API_PATHS.DELETE_USER_BYID]:[
            ROLES.ADMIN
        ],
    }
}