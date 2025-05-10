import { Router } from "express";
import { upload } from "../Cloudinary/CloudinaryConfig";
import * as PostController from '../Controllers/Post.controller'
const router = Router();

router.post("/", upload.array("Images"),PostController.createPost);
export default router