import type { PrismaClient } from "../prisma/generated/prisma/client.js";
import { prisma } from "../prisma/prisma.js";



export class AuthRepository {
    constructor(private prisma: PrismaClient) {
        this.prisma = prisma
    }

    async salvarToken(data: any) {
        return this.prisma.token.create({
            data
        });
    }

    async buscarToken(token: string) {
        return this.prisma.token.findFirst({
            where: { token }
        });
    }

    async revogarToken(token: string) {
        return this.prisma.token.updateMany({
            where: { token },
            data: { revoked: true }
        });
    }
}

export const authRepository = new AuthRepository(prisma)