import { CommonErrorHandler } from "@/errors/Customerror";
import { getS3Client } from "@/lib/S3Client";
import { ModuleContent } from "@/models/ModuleContentModel";
import { checkModuleWithId } from "@/repository/teacherrepository/module/ModuleRepository";
import { addContent, checkExistingContent } from "@/repository/teacherrepository/moduleContent/ModuleContentRepository";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";


const bucketName=process.env.AWS_BUCKET_NAME;
const folderName=process.env.AWS_VIDEO_FOLDER_NAME;
export const addModuleContent=async(content:ModuleContent,pdf:File,video:File)=>{
    const moduleCount=await checkModuleWithId(content.module_id);
    if(moduleCount==0){
        throw new CommonErrorHandler("No module found with id: "+content.module_id,400)
    }
   
    const checkExistingContentCount=await checkExistingContent(content.module_id,content.title);
    if(checkExistingContentCount>0){
        throw new CommonErrorHandler("Module content already exist with title: "+content.title,400)
    }

    const pdf_url=await uploadPdfToS3(pdf,content.module_id,content.title);
    if(!pdf_url){
        throw new CommonErrorHandler("Something went wrong while uploading pdf",500)
    }
    content.pdf_url=pdf_url;

    const video_url=await uploadVideoToS3(video,content.module_id,content.title);
    if(!video_url){
        throw new CommonErrorHandler("Something went wrong while uploading video",500)
    }
    content.video_url=video_url;
    const result=await addContent(content);
    if(!result){
    }
    return result;
}
const uploadPdfToS3=async(pdf:File,moduleId:string,title:string)=>{
    try {
        const s3:S3Client=getS3Client();
        const pdfBuffer=await pdf.arrayBuffer();
        const pdfObjectKey=`${folderName}/${moduleId}/${pdf.name}/.pdf`;

        const pdfCommand=new PutObjectCommand({
            Bucket:bucketName,
            Key:pdfObjectKey,
            Body:Buffer.from(pdfBuffer),
            ContentType:pdf.type
        })

        s3.send(pdfCommand);
       const pdf_url=`https://${bucketName}.s3.amazonaws.com/${pdfObjectKey}`

       return pdf_url;


    } catch (error) {
        throw new CommonErrorHandler("Something went wrong while uploading pdf and video",500)
    }
}

const uploadVideoToS3=async(video:File,moduleId:string,title:string)=>{
    try {
        const s3:S3Client=getS3Client();

        const videoBuffer=await video.arrayBuffer();
        const pdfObjectKey=`${folderName}/${moduleId}/${video.name}/.pdf`;

        const pdfCommand=new PutObjectCommand({
            Bucket:bucketName,
            Key:pdfObjectKey,
            Body:Buffer.from(videoBuffer),
            ContentType:video.type
        })

        s3.send(pdfCommand);
       const video_url=`https://${bucketName}.s3.amazonaws.com/${pdfObjectKey}`

       return video_url;

    } catch (error) {
        throw new CommonErrorHandler("Something went wrong while uploading pdf and video",500)
    }

}