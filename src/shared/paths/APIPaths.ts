
export enum API_PATHS{
    //USERS PATHS
    USER_LOGIN="/api/user/login",
    USER_REGISTER="/api/user/register",





    //ADMIN PATHS
    SEE_ALL_USERS="/api/admin/seeAllUsers",
    DELETE_USER_BYID="/api/admin/removeUser/:id",

    //Teacher PATHS
    ADD_NEW_COURSE="/api/teacher/course/addNewCourse",

    DELETE_COURSE="/api/teacher/course/deleteCourse/:course_id",
    GET_COURSE_BYID="/api/teacher/course/getCourse/:course_id",
    ADD_MODULE_COURSE_Id="/api/teacher/module/addModule/:course_id",
    ADD_MODULE_CONTENT="/api/teacher/module/addModuleContent/:module_id",

    GET_MODULES_BY_COURSE_ID="/api/teacher/module/getModules/:course_id",

}