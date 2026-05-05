import prisma from "../prisma/client.js";

export const findByEmail = (email: string) => {
    return prisma.usuario.findUnique({
        where: { email }
    });
};

export const createUser = (data: any) => {
    return prisma.usuario.create({
        data
    });
};

export const findById = (id: number) => {
    return prisma.usuario.findUnique({
        where: { id }
    });
};

export const updateUser = (id: number, data: any) => {
    return prisma.usuario.update({
        where: { id },
        data
    });
};