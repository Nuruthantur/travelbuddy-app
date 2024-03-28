import { v2 as cloudinary } from "cloudinary"; //configuring cloudinary for use in node.js app.

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export async function uploadImage(base64Image: string) {
  try {
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: "travelbuddy",
      // upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });
    return uploadResult;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Error uploading image to Cloudinary");
  }
}
