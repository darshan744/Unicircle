import { Router } from "express";
import { login, signup } from "../Controllers/Auth.controller";

const router = Router();

router.post("/login" , login)
router.post("/signup" , signup)