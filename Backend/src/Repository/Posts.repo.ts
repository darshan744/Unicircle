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

export const updatePost = () => { }

export const deletePost = () => { }
