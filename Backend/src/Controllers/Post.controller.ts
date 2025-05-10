import { Request, Response, NextFunction } from 'express'
import { Post } from '../Types/Frontend';
import { post } from '../Validators/Validator'
import { Exception } from '../Util/Exception';
import { HttpStatusCode } from '../Util/HttpStatusCode';
import { cloudinary } from '../Cloudinary/CloudinaryConfig'
import * as PostRepo from '../Repository/Posts.repo'

/**
 * @method POST
 * @route /api/post/
 * @description Creates a post for the selected group  
 */
export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    const imageFiles = req.files;
    // using formdata in frontend
    // so to append the body we must stringify
    // and then Angular also use stringify
    // hence we parse it here
    const body: Post = JSON.parse(req.body.data);
    const id = req.query.id
    if (!id) {
        return next(new Exception(HttpStatusCode.NOT_FOUND, "Id Not found"))
    }
    const validateBody = post.safeParse(body);
    if (validateBody.error) {
        return next(new Exception(HttpStatusCode.BAD_REQUEST, "Invalid Body"))
    }
    const postResult = await PostRepo.createPost(body, String(id))
    if (imageFiles) {
        const uploadPromises: Promise<string>[] = (imageFiles as Express.Multer.File[]).map(file =>
            new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: `Post_Images/${postResult.groupsId}`, public_id: postResult.id },
                    (err, uploadResult) => {
                        if (err) {
                            return reject(new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, "Error in Uploading images " + err.message))
                        }
                        const url = uploadResult?.url
                        if (!url) {
                            return reject(new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, "Error in Uploading images"))
                        }
                        resolve(url);
                    }
                ).end(file.buffer)
            })
        )
        try {
            const imageUrls = await Promise.all(uploadPromises);
            const respoResult = await PostRepo.addImageLink(postResult.id, imageUrls);
            res.json({ message: "Successfully created", data: respoResult })
        } catch (error: any) {
            next(new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, error.message))
        }
    }
    else {
        res.json({ message: "Successfully created", data: postResult })
    }
    
}

export const getUserPost = async (req: Request, res: Response, next: NextFunction) => {

}