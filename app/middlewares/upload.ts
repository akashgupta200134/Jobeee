import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// 1. Configuration (Fixed spelling errors in env variables)
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,  
  api_secret:process.env.CLOUDINARY_API_SECRET,
});

const uploadFile = async (file: File): Promise<UploadApiResponse> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: "hirenova",
        access_mode: "public",
        resource_type: "auto",
      },
      (error, result) => {
        // 2. Critical: Actually handle the error!
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return reject(error);
        }
        
        // 3. Resolve with the result
        if (result) {
          return resolve(result);
        } else {
          return reject(new Error("Upload successful but no result returned"));
        }
      }
    ).end(buffer);
  });
};

export default uploadFile;