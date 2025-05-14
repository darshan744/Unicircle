import { Router } from "express";
import { deleteGroups, deleteUser, getAllGroups, getAllUsres, posts } from "../Controllers/Admin.controller";


const router = Router();

router.route("/groups").get(getAllGroups).delete(deleteGroups)
router.route("/users").get(getAllUsres).delete(deleteUser)
router.get("/posts", posts)
export default router;