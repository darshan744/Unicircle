import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import envs from "../Environments";

cloudinary.config({
    cloud_name:envs.cloudinaryCloudName,
    api_key:envs.cloudinaryApiKey,
    api_secret:envs.cloudinaryApiSecretKey
});

const storage = multer.memoryStorage();
const upload = multer({storage : storage , limits:{fileSize : 1000000}})
export {storage , cloudinary , upload};