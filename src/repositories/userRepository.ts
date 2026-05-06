import type { PrismaClient, Usuario } from "@prisma/client";
import prisma from "../prisma/client.js";

export class UserRepository {
    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma
    }
 async listUsers(): Promise<Usuario[]> {
        return this.prisma.usuario.findMany();
    }

    async getUserEmail(email: string): Promise<Usuario | null> {
        return this.prisma.usuario.findUnique({
            where: { 
                email 
            }
        });
    }

    async getUserId(id: number): Promise<Usuario | null> {
        return this.prisma.usuario.findUnique({
            where: { 
                id 
            }
        });
    }

    async createUser(data: Partial<Usuario>): Promise<Usuario> {
        return this.prisma.usuario.create({
            data: data as Usuario
        });
    }

    async updateUser(id: number, data: Partial<Usuario>): Promise<Usuario> {
        return this.prisma.usuario.update({
            where: {
                id 
            },
            data
        });
    }
}    


export const userRepository = new UserRepository(prisma);

export function getUserEmail(email: any) {
    throw new Error("Function not implemented.");
}
export function createUser(arg0: { nome: any; email: any; senha: string; }) {
    throw new Error("Function not implemented.");
}

export function findByEmail(email: string) {
    throw new Error("Function not implemented.");
}

