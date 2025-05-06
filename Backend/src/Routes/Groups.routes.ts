import { Router } from "express";
import { checkGroupName, createGroup } from "../Controllers/Groups.controller";
import { upload } from "../Cloudinary/CloudinaryConfig";

const router = Router();

router.get("/checkGroupName" , checkGroupName)
router.route("/" ).post(upload.single("profileImage") , createGroup)
export default router;