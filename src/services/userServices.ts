import type { PrismaClient } from "@prisma/client";
import {  userRepository, type UserRepository } from "../repositories/userRepository.js";
import prisma from "../prisma/client.js";

export class UserService {
    constructor( private userRepository: UserRepository) {}

    async listUsers() {
        return this.userRepository.listUsers();
    }

    async getUserId(userId: number) {
        return this.userRepository.getUserId(userId);
    }
}
export const userService = new UserService(userRepository);