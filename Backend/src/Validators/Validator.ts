import { z } from "zod";

export 
const post = z.object({
    title: z.string({ required_error: "Title is empty" }),
    description : z.string({required_error : "Description is Empty"}),
    tags : z.array(z.string()),
    group : z.string()
})