import prisma from "../PrismaClient";

export const checkGroupNameAvailable = async (groupName : string)=>{
    const groupNameDB = await prisma.groups.findFirst({where : {name : groupName}});
    return groupNameDB !== null ;
}