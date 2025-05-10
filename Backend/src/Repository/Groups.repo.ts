import prisma from "../PrismaClient";

export const checkGroupNameAvailable = async (groupName: string) => {
    const groupNameDB = await prisma.groups.findFirst({ where: { name: groupName } });
    return groupNameDB !== null;
}

export const createGroupRepo = async (groupName: string, id: string) => {
    const group = await prisma.groups.create(
        {
            data: {
                name: groupName,
                admins: {
                    connect: { id }
                }
            }
        });
    return group;
}

export const updateGroupProfileImage = async (link: string, id: string) => {
    const res = await prisma.groups.update(
        {
            where: { id },
            data: { groupProfileImage: link }
        }
    )
    return res;
}

export const deleteGroup = async (id: string) => {
    const res = await prisma.groups.delete({ where: { id: id } })
    return res;
}

export const userGroups = async (userId: string) => {
    const res = await prisma.groups.findMany(
        {
            where:
            {
                admins:
                {
                    some:
                        { id: userId }
                }
            },
            select: {
                groupProfileImage: true,
                admins: {
                    select: {
                        name:true,
                        userName:true,
                    }
                },
                name: true,
                Users: true,
            }
        })
    return res;
}

