import { v2 as cloudinary } from 'cloudinary'; /// working with image/video uploads
import multer from 'multer'; /// Middleware used to handle file uploads in Express apps

/// Multer handles file uploads from the client to your server.
/// Cloudinary handles uploading from your server to the cloud.

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function imgUploadConfigs(fileUrl) {
  const result = await cloudinary.uploader.upload(fileUrl, {
    resource_type: 'auto', /// Automatically detects if it's an image, video, etc.
  });
  return result; /// object from Cloudinary (includes url, public_id, etc.).
}

const storage = new multer.memoryStorage(); /// Stores uploaded files in memory (RAM), not on disk.
const upload = multer({ storage });

export { upload, imgUploadConfigs };
