import {z} from 'zod'

const loginSchema = z.object({
    email:z.string(),
    password:z.string()
})

const signUpSchema = z.object({
    name:z.string(),
    email:z.string(),
    userName:z.string(),
    password:z.string(),
})

export {loginSchema , signUpSchema}