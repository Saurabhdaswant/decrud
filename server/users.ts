"use server"

import { db } from "@/db/drizzel"
import { users, User } from "@/db/schema"
import { eq } from "drizzle-orm";

export async function getUsers() {
    try {
        return await db.select().from(users)
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function createUser(user: Omit<User, "id" | "createdAt" | "updatedAt">) {
    try {
        await db.insert(users).values(user)
    } catch (error) {
        console.log(error);
        return { error: "Failed to create user" }
    }
}

export async function updateUser(user: Omit<User, "createdAt" | "updatedAt" | "password">) {
    try {
        await db.update(users).set(user).where(eq(users.id, user.id));
    } catch (error) {
        console.log(error);
        return { error: "Failed to update user" }
    }
}


export async function deleteUser(id: string) {
    try {
        await db.delete(users).where(eq(users.id, id))
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete user" }
    }
}


// This file defines server-side functions for managing users in the database using Drizzle ORM.
// It includes functions to get all users, create a new user, update an existing user, and delete a user by ID.
// Each function interacts with the `users` table defined in the schema and handles potential errors by logging them and returning appropriate messages.

// Example usage:
// import { getUsers, createUser, updateUser, deleteUser } from './server/users';
// const allUsers = await getUsers(); // Fetch all users
// await createUser({ email: 'example@example.com', username: 'exampleUser', password: 'securePassword' });