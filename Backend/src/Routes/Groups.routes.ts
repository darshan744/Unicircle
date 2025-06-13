import { Router } from "express";
import { checkGroupName, createGroup, userGroups } from "../Controllers/Groups.controller";
import { upload } from "../Options/CloudinaryConfig";

import * as PostController from '../Controllers/Post.controller'
const router = Router();

router.get("/checkGroupName", checkGroupName)
router.route("/").post(upload.single("profileImage"), createGroup)
router.get("/:userId", userGroups);
export default router;
