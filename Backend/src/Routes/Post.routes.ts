import { Router } from "express";
import { upload } from "../Options/CloudinaryConfig";
import * as PostController from '../Controllers/Post.controller'
const router = Router();

router.post("/", upload.array("Images"), PostController.createPost);
router.get("/user/:id", PostController.getUserPost);

router.get("/group/:groupId", PostController.getGroupPost)
export default router
