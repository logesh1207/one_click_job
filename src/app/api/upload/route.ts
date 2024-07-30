import { S3Client } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";
import uniqid from "uniqid";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req:NextRequest)
{
   const data=await req.formData(); 
   const file=data.get('file') as File;
   
   const s3Client=new S3Client({
      region:'ap-southeast-2',
      credentials:{
        accessKeyId:process.env.S3_ACCESS_KEY as string,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
      },
   });

   const newFilename=`${uniqid()}-${file.name}`;
   
 
   const chunks=[];
   for await (const chunk of file.stream()){
    chunks.push(chunk);
   }


 

   const buffer=Buffer.concat(chunks);
   const bucketName="logesh-job-board";
   await s3Client.send(new PutObjectCommand({
    Bucket:bucketName,
    Key:newFilename,
    ACL:'public-read',
    Body:buffer,
    ContentType:file.type,

   }));
   
   // Response.json({a:JSON.stringify(file.name)});

   return Response.json({
    newFilename,
    url:`https://${bucketName}.s3.amazonaws.com/${newFilename}`,



   });

}

