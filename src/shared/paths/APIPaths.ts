
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
    DELETE_ALL_INACTIVE_COURSES="/api/teacher/course/deleteAllCourses",
    GET_COURSE_BYID="/api/teacher/course/:course_id/getCourse",
    GET_ALL_COURSES="/api/teacher/course/getAllCourses",
   
   
    ADD_MODULE_COURSE_Id="/api/teacher/course/:course_id/addModule",
    GET_MODULES_BY_COURSE_ID="/api/teacher/course/:course_id/getModules",
    GET_MODULE_BYID="/api/teacher/course/module/:module_id/getModule",
    GET_ALL_MODULES="/api/course/teacher/module/getAllModules",
    DELETE_MODULE_BY_COURSEID="/api/teacher/course/:course_id/deleteAllModules",

    ADD_MODULE_CONTENT="/api/teacher/module/:module_id/addModuleContent",
    ADD_QUIZ="/api/teacher/course/module/:module_id/addQuiz",

    GET_ALL_QUIZZES="/api/teacher/course/module/:module_id/quiz/getAllQuiz",
    // GET_QUIZ_BYID="/api/teacher/course/module/:module_id/quiz/:quiz_id/getQuiz", 
}


