import { Request, Response, NextFunction } from 'express'
import { checkGroupNameAvailable, createGroupRepo, updateGroupProfileImage } from '../Repository/Groups.repo'
import { Exception } from '../Util/Exception';
import { HttpStatusCode } from '../Util/HttpStatusCode';
import { cloudinary } from '../Cloudinary/CloudinaryConfig';


export const checkGroupName = async (req: Request, res: Response, next: NextFunction) => {
    const groupName = req.query.groupName;
    if (!groupName) {
        return next(new Exception(HttpStatusCode.BAD_REQUEST, "Did not pass group name"));
    }
    const isFoundInDB = await checkGroupNameAvailable(groupName as string);
    if (isFoundInDB) {
        return next(new Exception(HttpStatusCode.CONFLICT, "Group Name already found"));
    }
    res.status(200).json({ message: `${groupName} is Available`, data: { available: true } })
}

export const createGroup = async (req: Request, res: Response, next: NextFunction) => {
    // at creation the group image is optional may be undefined
    const imageFile = req.file;
    const groupName: string = req.body.groupName;
    if(!groupName) {
        return next(new Exception(HttpStatusCode.BAD_REQUEST , "Group Name not found"));
    }
    const isFoundInDB = await checkGroupNameAvailable(groupName);
    if (isFoundInDB){
        return next(new Exception(HttpStatusCode.CONFLICT , "Group Name already Exist"))
    }
    const adminId = req.query.id;
    if(!adminId) {
        return next(new Exception(HttpStatusCode.BAD_REQUEST, "Id not found"))
    }
    const groupDB = await createGroupRepo(groupName , String(adminId));
    if (imageFile) {
        const result = cloudinary.uploader.upload_stream(
            { folder: "groupProfileImage", public_id: `GroupImage_${groupDB.id}`, overwrite:true},
            async (err, cloudinaryResult) => {
                if (err) {
                    return next(new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, err.message))
                }
                const link = cloudinaryResult?.url;
                if (!link) {
                    return next(new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, "Link Not found"));
                }
                await updateGroupProfileImage(link, groupDB.id);
                res.status(200).json({ message: "Group Created", data: groupDB })
            }
        ).end(imageFile.buffer)
    }
    else {
        res.status(200).json({ message: "Group Created", data: groupDB })
    }
}