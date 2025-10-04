import { uuid, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});


export type User = typeof users.$inferSelect