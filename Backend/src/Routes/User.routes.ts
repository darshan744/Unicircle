import Router from 'express'
import { deleteAllUser } from '../Controllers/Users.controller';
import {upload} from '../Cloudinary/CloudinaryConfig'
import * as ProfileController from '../Controllers/Profile.controller';
const router = Router();

router.delete("/deleteAll", deleteAllUser);


router
  .route("/:id/profile")
  .post(upload.single("profileImage"), ProfileController.uploadProfile)
  .delete(ProfileController.deleteProfile)
  .get(ProfileController.getProfile);

router.post("/images" , upload.array("files") , (req , res)=>{
  const files = req.files;
  console.log(files)
  res.json({files})
})




export default router