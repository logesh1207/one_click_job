import { S3Client } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";
import uniqid from "uniqid";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get('file') as File;

  const s3Client = new S3Client({
    region: 'ap-southeast-2',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY as string,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
    },
  });

  const newFilename = `${uniqid()}-${file.name}`;

  // Read the file stream
  const stream = file.stream();
  const reader = stream.getReader();

  const chunks: Uint8Array[] = [];
  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    if (value) {
      chunks.push(value);
    }
    done = readerDone;
  }

  // Combine chunks into a single Buffer
  const buffer = Buffer.concat(chunks);

  const bucketName = "logesh-job-board";
  await s3Client.send(new PutObjectCommand({
    Bucket: bucketName,
    Key: newFilename,
    ACL: 'public-read',
    Body: buffer,
    ContentType: file.type,
  }));

  return new Response(JSON.stringify({
    newFilename,
    url: `https://${bucketName}.s3.amazonaws.com/${newFilename}`,
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
