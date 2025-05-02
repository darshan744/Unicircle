import { Request , Response } from "express";
import { deletUserMany } from "../Repository/Users.repo";


export const deleteAllUser = async (req : Request , res:Response)=> {
    try {
        await deletUserMany();
        res.status(200).json({message : "Successfully deleted"})
    } catch (error:any) {
        res.status(500).json({message :error.message })
    }
}

export const deleteUserById = async (req : Request , res : Response)=>{}


export const deleteUserByGroup = async (req: Request, res: Response) => {};