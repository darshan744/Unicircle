import { Router } from "express";
import { checkGroupName, createGroup, userGroups } from "../Controllers/Groups.controller";
import { upload } from "../Cloudinary/CloudinaryConfig";

const router = Router();

router.get("/checkGroupName" , checkGroupName)
router.route("/" ).post(upload.single("profileImage") , createGroup)
router.get("/:userId",userGroups);
export default router;