import prisma from "../PrismaClient";


export const deletUserMany = async ()=>{
    return await prisma.user.deleteMany()
}