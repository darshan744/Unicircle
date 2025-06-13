import { Request, Response, NextFunction } from 'express'
import * as GroupRepo from '../Repository/Groups.repo'
import { Exception } from '../Util/Exception';
import { HttpStatusCode } from '../Util/HttpStatusCode';
import { cloudinary } from '../Options/CloudinaryConfig';

/**
 * @method GET
 * @route /api/groups/checkGroupName
 * @description Checks group name available or not 
 */
export const checkGroupName = async (req: Request, res: Response, next: NextFunction) => {
    const groupName = req.query.groupName;
    if (!groupName) {
        return next(new Exception(HttpStatusCode.BAD_REQUEST, "Did not pass group name"));
    }
    const isFoundInDB = await GroupRepo.checkGroupNameAvailable(groupName as string);
    if (isFoundInDB) {
        return next(new Exception(HttpStatusCode.CONFLICT, "Group Name already found"));
    }
    res.status(200).json({ message: `${groupName} is Available`, data: { available: true } })
}
/**
 * @method POST
 * @route /api/groups/
 * @description Creates Groups 
 */
export const createGroup = async (req: Request, res: Response, next: NextFunction) => {
    // at creation the group image is optional may be undefined
    const imageFile = req.file;
    const groupName: string = req.body.groupName;
    if (!groupName) {
        return next(new Exception(HttpStatusCode.BAD_REQUEST, "Group Name not found"));
    }
    const isFoundInDB = await GroupRepo.checkGroupNameAvailable(groupName);
    if (isFoundInDB) {
        return next(new Exception(HttpStatusCode.CONFLICT, "Group Name already Exist"))
    }
    const adminId = req.query.id;
    if (!adminId) {
        return next(new Exception(HttpStatusCode.BAD_REQUEST, "Id not found"))
    }
    const groupDB = await GroupRepo.createGroupRepo(groupName, String(adminId));
    // if profile image is uploaded upload that image
    if (imageFile) {
        const result = cloudinary.uploader.upload_stream(
            { folder: "groupProfileImage", public_id: `GroupImage_${groupDB.id}`, overwrite: true },
            async (err, cloudinaryResult) => {
                if (err) {
                    return next(new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, err.message))
                }
                const link = cloudinaryResult?.url;
                if (!link) {
                    return next(new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, "Link Not found"));
                }
                await GroupRepo.updateGroupProfileImage(link, groupDB.id);
                res.status(200).json({ message: "Group Created", data: groupDB })
            }
        ).end(imageFile.buffer)
    }
    else {
        res.status(200).json({ message: "Group Created", data: groupDB })
    }
}

/**
 * @method GET
 * @route /api/groups/:userId
 * @description Returns user's groups
 */
export const userGroups = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.userId;
    if (!id) {
        return next(new Exception(HttpStatusCode.BAD_REQUEST, "Id not found"))
    }
    const groups = await GroupRepo.userGroups(String(id));
    if (!groups) {
        return next(new Exception(HttpStatusCode.NOT_FOUND, "No groups found"));
    }
    res.status(200).json({ message: "Groups found", data: groups });
}

