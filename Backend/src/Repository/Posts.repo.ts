import { Post } from "../Types/Frontend";
import prisma from "../PrismaClient";

/**
 * @param post post object to be created
 * @param userId who is creating 
 */
export const createPost = async (post: Post, userId: string) => {
    return await prisma.post.create({
        data: {
            title: post.title,
            description: post.description,
            tags: {
                connectOrCreate: post.tags.map(
                    name => ({
                        where: { name },
                        create: { name }
                    })
                )
            },
            userId,
            groupsId: post.group
        }
    })
}
/**
 * 
 * @param postId the post to be assinged to  
 * @param links  the links to be set
 * 
 */
export const addImageLink = async (postId: string, links: string[]) => {
   return await prisma.post.update({
        where: {id : postId},
        data : {images : { set : links}}
    })
}
export const updatePost = () => { }

export const deletePost = () => { }
