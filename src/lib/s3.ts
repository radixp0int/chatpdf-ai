import AWS from "aws-sdk";
import exp from "constants";
import { parse } from "path";

export async function uploadToS3(file: File) {
  try {
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
    });

    const s3 = new AWS.S3({
      params: {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      },
      region: process.env.NEXT_PUBLIC_S3_BUCKET_REGION,
    });

    const file_key =
      "uploads/" + Date.now().toString() + file.name.replace(" ", "-");

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
      Body: file,
    };

    const upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(
          "Uploading...",
          parseInt(((evt.loaded * 100) / evt.total).toString())
        ) + "%";
      })
      .promise();

    await upload.then((data) => {
      //when upload finish
      console.log("Upload Success!", file_key);
    });

    return Promise.resolve({
      file_key,
      file_name: file.name,
    });
  } catch (error) {}
}

export function getS3Url(file_key: string) {
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_BUCKET_REGION}.amazonaws.com/${file_key}`;
  return url;
}

// export function deleteFromS3(file_key: string) {
