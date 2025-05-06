import prisma from "../PrismaClient";


export const getGroups = async() =>  await prisma.groups.findMany({select:{admins:true}});

export const deleteAllGroups = async() => await prisma.groups.deleteMany({});

export const getUsers = async() => await prisma.user.findMany({select:{groups:true , adminGroups:true , }});

export const deleteUserWithId = async(id : string) => await prisma.user.delete({where:{id}})    