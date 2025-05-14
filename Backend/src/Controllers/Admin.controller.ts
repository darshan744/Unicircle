import { Request , Response } from "express";
import { deleteAllGroups, deleteUserWithId, getGroups, getUsers } from "../Repository/Admin.repo";
import { getAllPosts } from "../Repository/Posts.repo";
export const getAllGroups = async (req : Request , res : Response) => {
    const groups = await getGroups()
    res.status(200).json({groups});
}

export const getAllUsres = async (req: Request, res: Response) => {
    const users = await getUsers()
    res.status(200).json({ users });
}
export const deleteGroups = async(req : Request , res : Response) => {
    const result = await deleteAllGroups()
    res.status(200).json({ result });   
}
export const deleteUser = async(req : Request , res : Response) => {
        const id = req.query.id
        const user = await deleteUserWithId(id as string)
        res.status(200).json({user})
}
export const posts = async (_ :Request ,res : Response) => {
    const posts = await getAllPosts();
    res.json({posts})
}
 