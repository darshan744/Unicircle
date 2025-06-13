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
 * @param postId the post to be assinged to  
 * @param links  the links to be set
 */
export const addImageLink = async (postId: string, links: string[]) => {
    return await prisma.post.update({
        where: { id: postId },
        data: { images: { set: links } }
    })
}

/**
 * @param userId -> user's id 
 * @description returns user's post
 */
export const userPost = async (userId: string) => {
    /**
     *  title: string;
        description: string;
        id: string;
        userId: string;
        images: string[];
        createdAt: Date;
        updatedAt: Date;
     */
    return await prisma.user.findFirst(
        {
            where: {
                id: userId
            },
            select: {
                posts: {
                    select: {
                        title: true,
                        description: true,
                        id: true,
                        images: true,
                        createdAt: true,
                        updatedAt: true,
                        group: true,
                    }
                },
            }
        })
}
export const getAllPosts = async () => await prisma.post.findMany();

export const updatePost = () => { }

export const deletePost = () => { }

export const groupPost = async (groupId: string) => {
    return await prisma.post.findMany({
        where: {
            groupsId: groupId
        },
        include: {
            User: {
                select: {
                    userName: true,
                    profileImage: true,
                }

            }
        }
    })
}
/**
 *  title: string;
    description: string;
    id: string;
    userId: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
    groupsId: string;

 *  
 * */
