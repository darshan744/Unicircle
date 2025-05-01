import { User } from "../Types/Auth";
import prisma from "../PrismaClient";


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

export { doesUserExist, createUser, findUser };