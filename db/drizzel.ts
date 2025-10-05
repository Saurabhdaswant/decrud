import { drizzle } from 'drizzle-orm/neon-http';
export const db = drizzle(process.env.DATABASE_URL!);


// this file is for initializing the database connection using Drizzle ORM with Neon as the database provider.
// It imports the `drizzle` function from the `drizzle-orm/neon-http` package and creates a `db` instance using the database URL from environment variables.
// The `db` instance can then be used throughout the application to interact with the database.
// Make sure to set the `DATABASE_URL` environment variable in your development and production environments.


// Example usage:
// import { db } from './db/drizzel';
// const users = await db.select().from('users'); // Example query to fetch all users