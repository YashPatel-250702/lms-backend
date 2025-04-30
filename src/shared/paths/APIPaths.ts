
export enum API_PATHS{
    //USERS PATHS
    USER_LOGIN="/api/user/login",
    USER_REGISTER="/api/user/register",
    //ADMIN PATHS
    SEE_ALL_USERS="/api/admin/seeAllUsers",
    DELETE_USER_BYID="/api/admin/user_id/removeUser",
    SUSPENDED_USER_BYID="/api/admin/user_id/suspendUser",

    //Teacher PATHS
    ADD_NEW_COURSE="/api/teacher/course/addNewCourse",

    DELETE_COURSE="/api/teacher/course/:course_id/deleteCourse",
    GET_COURSE_BYID="/api/teacher/course/:course_id/getCourse",
    ADD_MODULE_COURSE_Id="/api/teacher/course/:course_id/addModule",
    ADD_MODULE_CONTENT="/api/teacher/module/:module_id/addModuleContent",

    GET_MODULES_BY_COURSE_ID="/api/teacher/course/:course_id/getModules",

}