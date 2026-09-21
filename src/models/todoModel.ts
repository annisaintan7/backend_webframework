import pool from '../config/db.js';

export const TodoModel = {

    // Ambil semua todo milik user
    getByUserId: async (
        userId: number,
        limit: number,
        offset: number
    ) => {
        const [rows] = await pool.query(
            `
            SELECT
                id,
                task,
                is_completed
            FROM todos
            WHERE user_id = ?
            ORDER BY id DESC
            LIMIT ? OFFSET ?
            `,
            [userId, limit, offset]
        );

        return rows;
    },

    // Menghitung jumlah seluruh todo milik user
    countByUserId: async (
        userId: number
    ) => {
        const [rows] = await pool.query(
            `
            SELECT COUNT(*) AS total
            FROM todos
            WHERE user_id = ?
            `,
            [userId]
        );

        const result = rows as {
            total: number;
        }[];

        return Number(result[0]?.total || 0);
    },

    // Ambil satu todo berdasarkan ID
    getById: async (
        id: number,
        userId: number
    ) => {
        const [rows] = await pool.query(
            `
            SELECT
                id,
                task,
                is_completed
            FROM todos
            WHERE id = ?
            AND user_id = ?
            LIMIT 1
            `,
            [id, userId]
        );

        const result = rows as {
            id: number;
            task: string;
            is_completed: number | boolean;
        }[];

        return result[0] || null;
    },

    // Membuat todo baru
    create: async (
        userId: number,
        task: string
    ) => {
        const [result] = await pool.query(
            `
            INSERT INTO todos
                (user_id, task, is_completed)
            VALUES
                (?, ?, ?)
            `,
            [userId, task, false]
        );

        const insertResult = result as {
            insertId: number;
        };

        return insertResult.insertId;
    },

    // Update todo
    update: async (
        id: number,
        userId: number,
        task: string,
        isCompleted: boolean
    ) => {
        const [result] = await pool.query(
            `
            UPDATE todos
            SET
                task = ?,
                is_completed = ?
            WHERE id = ?
            AND user_id = ?
            `,
            [
                task,
                isCompleted,
                id,
                userId
            ]
        );

        const updateResult = result as {
            affectedRows: number;
        };

        return updateResult.affectedRows;
    },

    // Delete todo
    delete: async (
        id: number,
        userId: number
    ) => {
        const [result] = await pool.query(
            `
            DELETE FROM todos
            WHERE id = ?
            AND user_id = ?
            `,
            [id, userId]
        );

        const deleteResult = result as {
            affectedRows: number;
        };

        return deleteResult.affectedRows;
    }
};