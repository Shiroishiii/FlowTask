import type { PrismaClient } from "@prisma/client";
import {  userRepository, type UserRepository } from "../repositories/userRepository.js";
import prisma from "../../prisma/client.js";

export class UserService {
    constructor( private userRepository: UserRepository) {}

    async listUsers() {
        return this.userRepository.listUsers();
    }

    async getUserId(userId: number) {
        return this.userRepository.getUserId(userId);
    }
    async updateUser(userId: number, data: any) {
        return this.userRepository.updateUser(userId, data);
    }
}
export const userService = new UserService(userRepository);