import { Router } from "express";
import { login, signup ,refreshToken } from "../Controllers/Auth.controller";

const router = Router();

router.post("/login" , login)
router.post("/signup" , signup)
router.get("/refresh-token", refreshToken);
export default router;