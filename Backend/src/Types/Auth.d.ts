import { loginSchema , signUpSchema } from "../Validators/Auth.validator";
import {z} from 'zod'

type Login = z.infer<typeof loginSchema>

type SignUp = z.infer<typeof signUpSchema>

type User = z.infer<typeof signUpSchema>