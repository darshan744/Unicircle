import {Request , Response , NextFunction} from 'express'
import { checkGroupNameAvailable } from '../Repository/Groups.repo'
import { Exception } from '../Util/Exception';
import { HttpStatusCode } from '../Util/HttpStatusCode';

export const checkGroupName = async(req : Request , res : Response , next : NextFunction) => {
    const groupName = req.query.groupName;
    if(!groupName){
        return next(new Exception(HttpStatusCode.BAD_REQUEST , "Did not pass group name"));
    }
    const isFoundInDB = await checkGroupNameAvailable(groupName as string);
    if (isFoundInDB){
        return next(new Exception(HttpStatusCode.CONFLICT , "Group Name already found"));
    }
    res.status(200).json({message : `${groupName} is Available` , data:{available : true} })
}

export const createGroup = async(req : Request , res : Response , next : NextFunction) => {
    
}