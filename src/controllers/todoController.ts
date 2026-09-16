import { Request, Response } from 'express';
import { TodoModel } from '../models/todoModel';

// GET /api/todos
// Ambil semua todo milik user yang sedang login
export const getTodos = async (
    req: Request,
    res: Response
): Promise<void> => {
    const userId = res.locals.userId;

    try {
        const todos = await TodoModel.getByUserId(userId);

        res.status(200).json({
            success: true,
            data: todos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data.'
        });
    }
};


// GET /api/todos/:id
// Ambil satu todo berdasarkan ID
export const getTodoById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    const userId = res.locals.userId;

    try {
        const todo = await TodoModel.getById(
            Number(id),
            userId
        );

        // Jika todo tidak ditemukan atau bukan milik user
        if (!todo) {
            res.status(404).json({
                success: false,
                message: 'Tugas tidak ditemukan!'
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: todo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data.'
        });
    }
};


// POST /api/todos
// Tambah todo baru
export const createTodo = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { task } = req.body;
    const userId = res.locals.userId;

    try {
        const newId = await TodoModel.create(
            userId,
            task
        );

        res.status(201).json({
            success: true,
            message: 'Tugas berhasil ditambahkan',
            data: {
                id: newId,
                task,
                is_completed: false
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal menambahkan tugas.'
        });
    }
};


// PUT /api/todos/:id
// Update task atau status selesai
export const updateTodo = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    const { task, is_completed } = req.body;
    const userId = res.locals.userId;

    try {
        const affectedRows = await TodoModel.update(
            Number(id),
            task,
            is_completed,
            userId
        );

        // Jika affectedRows = 0,
        // berarti todo tidak ditemukan atau bukan milik user
        if (affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: 'Tugas tidak ditemukan!'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Tugas berhasil diperbarui!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui tugas.'
        });
    }
};


// DELETE /api/todos/:id
// Hapus todo
export const deleteTodo = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    const userId = res.locals.userId;

    try {
        const affectedRows = await TodoModel.delete(
            Number(id),
            userId
        );

        // Jika affectedRows = 0,
        // berarti todo tidak ditemukan atau bukan milik user
        if (affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: 'Tugas tidak ditemukan!'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Tugas berhasil dihapus!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal menghapus tugas.'
        });
    }
};