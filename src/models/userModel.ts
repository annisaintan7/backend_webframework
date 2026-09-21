import pool from '../config/db.js';
import type { RowDataPacket } from 'mysql2';

interface User extends RowDataPacket {
    id: number;
    username: string;
    email: string;
    password: string;
}

export const UserModel = {

    create: async (
        username: string,
        email: string,
        password: string
    ): Promise<void> => {

        await pool.execute(
            `
            INSERT INTO users
            (username, email, password)
            VALUES (?, ?, ?)
            `,
            [
                username,
                email,
                password
            ]
        );
    },

    findByUsername: async (
        username: string
    ): Promise<User | null> => {

        const [rows] = await pool.execute<User[]>(
            `
            SELECT
                id,
                username,
                email,
                password
            FROM users
            WHERE username = ?
            LIMIT 1
            `,
            [username]
        );

        if (rows.length === 0) {
            return null;
        }

        return rows[0]!;
    }
};