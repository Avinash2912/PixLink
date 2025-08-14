
import {db} from '../db/index.js';
import {usersTable} from '../models/user.model.js'
import{eq} from 'drizzle-orm';

export async function getUserByEmail(email) {
    const [existingUser] = await db
    .select({ 
        id: usersTable.id,
        email: usersTable.email,
        firstname: usersTable.firstname,
        lastname: usersTable.lastname,
        salt: usersTable.salt,
        password: usersTable.password
     })
    .from(usersTable)
    .where(eq(usersTable.email, email));

    return existingUser;
}

export async function createUser({ firstname, lastname, email, salt, password }) {
    const [user] = await db
        .insert(usersTable)
        .values({
            firstname,
            lastname,
            email,
            salt,
            password,
        })
        .returning({ id: usersTable.id });
    return user;
}