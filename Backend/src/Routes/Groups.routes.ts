import { Router } from "express";
import { checkGroupName } from "../Controllers/Groups.controller";

const router = Router();

router.get("/checkGroupName" , checkGroupName)

export default router;