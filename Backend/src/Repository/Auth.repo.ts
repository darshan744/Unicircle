import { User } from "../Types/Auth";
import prisma from "../PrismaClient";
import { hashPassword } from "../Util/Password";


const doesUserExist = async (email: string): Promise<boolean> => {
    try {
        const user = await prisma.user.findFirst({ where: { email } })
        // if no user then we are good to go 
        // if user is there then we can't process
        return user === null
    } catch (error) {
        throw error;
    }
}

const createUser = async (user: User) => {
    user.password = await hashPassword(user.password);
    try {
        const userData = prisma.user.create({ data: user });
        return userData
    } catch (error) {
        throw error;
    }
}

const findUser = async (email: string) => {
    try {
        const user = await prisma.user.findFirst({ where: { email } });
        return user;
    } catch (error) {
        throw error;
    }

}
const userNameCheck = async(userName : string) => {
   return await prisma.user.findFirst({where : {userName}})
}
export { doesUserExist, createUser, findUser, userNameCheck };