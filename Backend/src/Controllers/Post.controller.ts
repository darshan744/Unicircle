import { Request, Response, NextFunction } from 'express'
import { Post } from '../Types/Frontend';
import { post } from '../Validators/Validator'
import { Exception } from '../Util/Exception';
import { HttpStatusCode } from '../Util/HttpStatusCode';
import { cloudinary } from '../Options/CloudinaryConfig'
import * as PostRepo from '../Repository/Posts.repo'
import { ApiResponse } from '../Util/ApiResponse';

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
            const repoResult = await PostRepo.addImageLink(postResult.id, imageUrls);
            const response: ApiResponse<typeof repoResult> = new ApiResponse("Successfully created", repoResult)
            res.json(response)
        } catch (error: any) {
            next(new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, error.message))
        }
    }
    else {
        const response: ApiResponse<typeof postResult> = new ApiResponse("Successfully created", postResult);
        res.json(response)
    }

}
/**
 * @method GET
 * @route /api/posts/user/:userId
 * @description Returns the user's posts alone 
 */
export const getUserPost = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const posts = await PostRepo.userPost(String(id));
    const response: ApiResponse<typeof posts> = new ApiResponse("Posts", posts)
    res.json(response)
}
/** 
 * @method GET
 * @route /api/groups/:groupId
 * @description Returns the posts of the GroupId not managing the state but only as a one time value
 * */
export const getGroupPost = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.groupId;
    console.log(id)
    try {
        const groupPosts = await PostRepo.groupPost(id);
        const response: ApiResponse<typeof groupPosts> = new ApiResponse("Group Posts", groupPosts)
        res.json(response);
    } catch (err: any) {
        next(new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, err.message))
    }
}
