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
        ],
        [API_PATHS.ADD_MODULE_COURSE_Id]:[
            ROLES.ADMIN,
            ROLES.TEACHER
        ],
        [API_PATHS.ADD_MODULE_CONTENT]:[
            ROLES.ADMIN,
            ROLES.TEACHER
        ],

    },

    [HTTP_METHODS.GET]:{
        [API_PATHS.SEE_ALL_USERS]:[ 
            ROLES.ADMIN
        ],
        [API_PATHS.GET_COURSE_BYID]:[
            ROLES.ADMIN,
            ROLES.TEACHER,
            ROLES.STUDENT
        ],
        [API_PATHS.GET_MODULES_BY_COURSE_ID]:[
            ROLES.ADMIN,
            ROLES.TEACHER,
            ROLES.STUDENT
        ],
        [API_PATHS.GET_ALL_COURSES]:[
            ROLES.ADMIN,
            ROLES.TEACHER,
            ROLES.STUDENT
        ],
    }
    ,
    [HTTP_METHODS.DELETE]:{
        [API_PATHS.DELETE_USER_BYID]:[
            ROLES.ADMIN
        ],
        [API_PATHS.DELETE_COURSE]:[
            ROLES.ADMIN,
            ROLES.TEACHER
        ],
        [API_PATHS.DELETE_ALL_INACTIVE_COURSES]:[
            ROLES.ADMIN,
            ROLES.TEACHER
        ],
    },
    [HTTP_METHODS.PUT]:{
        [API_PATHS.SUSPENDED_USER_BYID]:[
            ROLES.ADMIN
        ]
    }
}