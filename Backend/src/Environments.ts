import dotenv from 'dotenv'
dotenv.config({ path: ".env" })
const envs = {
  port: process.env.PORT || 8080,
  secretKey: process.env.SECRET_KEY || "secret Key",
  refreshKey: process.env.REFRESH_KEY || "refresh Key",
  cloudinaryApiSecretKey: process.env.CLOUDINARY_API_SECRET_KEY,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
};
export default envs;