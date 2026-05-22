import type { PrismaClient } from "@prisma/client";
import prisma from "../prisma/client.js";
import type { Usuario } from "../prisma/generated/prisma/browser.js";



export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async listUsers(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }

  async getUserEmail(email: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: {
        email,
      },
    });
  }

  async getUserId(id: number) {
    return this.prisma.usuario.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        email: true,
        role: true
      }
    });
  }

  async createUser(data: Partial<Usuario>): Promise<Usuario> {
    return this.prisma.usuario.create({
      data: data as Usuario
    });
  }

  async updateUser(id: number, data: Partial<Usuario>) {
    return this.prisma.usuario.update({
      where: {
        id
      },
      data,
      select: {
        id: true,
        nome: true,
        email: true,
        role: true
      }
    });
  }
}

export const userRepository = new UserRepository(prisma);
