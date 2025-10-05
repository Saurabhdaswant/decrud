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



// This file defines the schema for the "user" table in a PostgreSQL database using Drizzle ORM.
// It imports necessary functions and types from the `drizzle-orm/pg-core` package to define the table structure.
// The `users` constant represents the "user" table with columns for id, email, username, password, createdAt, and updatedAt.
// Each column is defined with its data type and constraints (e.g., primary key, not null, unique).
// The `User` type is inferred from the `users` table schema, allowing for type-safe interactions with user records in the database.

// Example usage:
// import { db } from './db/drizzel';
// const allUsers: User[] = await db.select().from(users); // Fetch all users from the database

// what is pgTable ? 
// pgTable is a function from Drizzle ORM that helps define a PostgreSQL table schema in a type-safe manner.
// It allows you to specify the table name and its columns, along with their data types and constraints.
// This function is essential for setting up the database structure and enables type-safe queries and operations on the defined table.


// what is $inferSelect ?
// $inferSelect is a utility provided by Drizzle ORM that infers the TypeScript type of the selected rows from a defined table schema.
// It generates a type based on the columns and their data types in the table, allowing for type-safe interactions when querying the database.
// This ensures that when you select data from the table, you get the correct types for each column, reducing runtime errors and improving code reliability.


// what is defaultRandom() ?
// defaultRandom() is a method used in Drizzle ORM to set a default value for a column that generates a random value, typically for unique identifiers like UUIDs.
// When applied to a column, it ensures that if no value is provided during an insert operation, a random value will be automatically generated and assigned to that column.
// This is particularly useful for primary key fields where you want to ensure uniqueness without manually specifying the value.


// what is defaultNow() ?
// defaultNow() is a method used in Drizzle ORM to set a default value for a timestamp column to the current date and time when a new record is created.
// When applied to a column, it ensures that if no value is provided during an insert operation, the column will automatically be populated with the current timestamp.
// This is commonly used for fields like createdAt or updatedAt to track when a record was created or last modified.