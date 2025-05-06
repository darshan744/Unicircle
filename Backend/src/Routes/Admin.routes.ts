import { Router } from "express";
import { deleteGroups, deleteUser, getAllGroups, getAllUsres } from "../Controllers/Admin.controller";


const router = Router();

router.route("/groups").get(getAllGroups).delete(deleteGroups)
router.route("/users").get(getAllUsres).delete(deleteUser)
export default router;