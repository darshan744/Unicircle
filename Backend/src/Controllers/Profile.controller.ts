import { NextFunction, Request, Response } from "express";
import { cloudinary } from "../Cloudinary/CloudinaryConfig";
import { Exception } from "../Util/Exception";
import { HttpStatusCode } from "../Util/HttpStatusCode";
import { updateProfile, deleteProfile as UserDeleteProfile } from "../Repository/Users.repo";

export const uploadProfile = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        return next(new Exception(HttpStatusCode.BAD_REQUEST, "No profile Image found"));
    }
    const result = cloudinary.uploader.upload_stream(
        { folder: "Profile Images", public_id: `${req.params.id}_profile`, overwrite: true },
        async (err, result) => {
            if (err) {
                return next(new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, err.message));
            }
            if (!result) {
                return next(new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, "Something went wrong"));
            }
            await updateProfile(req.params.id, result?.url);
            res.status(200).json({ message: "Successfull", data: { url: result?.url } });
        },
    );

    result.end(req.file.buffer);
};
export const deleteProfile = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!id) {
        return next(new Exception(HttpStatusCode.BAD_REQUEST, "No id found"));
    }
    cloudinary.uploader
        .destroy(`${id}_profile`)
        .then(async (result) => {
            UserDeleteProfile(id)
                .then((_e) => res.status(200).json({ message: "Deleted Successfully", data: result }))
                .catch((_err) => next(new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, "Could not delete profile In DB")));
        })
        .catch((err) => next(new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, err.message)));
};

export const getProfile = async (req: Request, res: Response) => {
    res.json({ message: "HELLO" });
};
