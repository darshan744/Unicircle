import { z } from "zod";
import { post } from "../Validators/Validator";

export type Post = z.infer<typeof post>