
export default interface CourseModel {
    course_id?: string;
    course_name: string;
    course_description: string;
    course_duration: string;
    course_fee: string;
    created_at?: Date;
    updated_at?: Date;
}