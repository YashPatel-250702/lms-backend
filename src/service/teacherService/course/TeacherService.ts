import { CommonErrorHandler } from "@/errors/Customerror";
import { getS3Client } from "@/lib/S3Client";
import { Course } from "@/models/CourseModel";
import { addNewCourse, deleteCourse, ExistCourseWithId, ExistCourseWithTitle, ExistTeacherWithId, findCourseById } from "@/repository/teacherrepository/course/TeacherRepository";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";


export const addCourse = async (course: Course,image:File) => {
    
    const existingTeacherCount = await ExistTeacherWithId(course.teacher_id);
    if (existingTeacherCount === 0) {
        throw new CommonErrorHandler("Teacher with this ID does not exist", 400);
    }
        
    const existingCourseCount :number= await ExistCourseWithTitle(course.teacher_id,course.course_title);
    if (existingCourseCount > 0) {
        throw new CommonErrorHandler("Course with this title already exists", 400);
    } 

    const imageUrl=await uploadImageToS3(image,course.teacher_id);
    if(!imageUrl){
        throw new CommonErrorHandler("Image upload failed",500)
    }
    course.course_imageUrl=imageUrl;

    const createdCourse = await addNewCourse(course);
    if (!createdCourse) {
        throw new CommonErrorHandler("Course creation failed", 500);
    }

    return createdCourse;
}



const uploadImageToS3 = async (image: File,teacher_id:string):Promise<string> => {
    const bucketName=process.env.AWS_BUCKET_NAME;
    const folderName=process.env.AWS_FOLDER_NAME;  

    const buffer = await image.arrayBuffer();

    const objectId=`${folderName}/${image.name}-${teacher_id}`;

    const s3:S3Client=getS3Client();
    const params = {
      Bucket: bucketName,
      Key: objectId,
      Body: Buffer.from(buffer),
      ContentType: image.type,
    };

    s3.send(new PutObjectCommand(params));
    const imageUrl=`https://${bucketName}.s3.amazonaws.com/${objectId}`
    return imageUrl;
}


export const deleteCourseById=async(course_id:string)=>{
    const ExistCourse=await ExistCourseWithId(course_id);
    if(ExistCourse===0){
        throw new CommonErrorHandler("Course with this id does not exist",400);
    }
    const deletedCourse=await deleteCourse(course_id);
    if(!deletedCourse){
        throw new CommonErrorHandler("Course deletion failed",500);
    }
    return deletedCourse;
}

export const getCourseById=async(course_id:string)=>{
    const ExistCourse=await ExistCourseWithId(course_id);
    if(ExistCourse===0){
        throw new CommonErrorHandler("Course with this id does not exist",400);
    }
    const course=await findCourseById(course_id);
    if(!course || course===null || course===undefined ){
        throw new CommonErrorHandler("Course not found",404);
    }
    return course;
}
