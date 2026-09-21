import type {
    Request,
    Response
} from 'express';

import {
    TodoModel
} from '../models/todoModel.js';

import type {
    CreateTodoRequest,
    UpdateTodoRequest,
    TodoResponse,
    TodoRow
} from '../types/todo.js';

import type {
    PaginationMeta
} from '../types/common.js';

import {
    sendSuccess,
    sendSuccessPagination,
    sendError
} from '../utils/response.js';


// Helper pagination
const parsePositiveInt = (
    value: unknown,
    fallback: number
): number => {
    const parsed = Number(value);

    if (
        Number.isInteger(parsed) &&
        parsed > 0
    ) {
        return parsed;
    }

    return fallback;
};


// GET /todos
export const getTodos = async (
    req: Request,
    res: Response
): Promise<void> => {

    const userId = res.locals.userId;

    const page = parsePositiveInt(
        req.query.page,
        1
    );

    const perPage = Math.min(
        parsePositiveInt(
            req.query.perPage,
            10
        ),
        50
    );

    const offset =
        (page - 1) * perPage;

    try {

        const todos =
            await TodoModel.getByUserId(
                userId,
                perPage,
                offset
            );

        const total =
            await TodoModel.countByUserId(
                userId
            );

        const data: TodoResponse[] =
            (todos as TodoRow[]).map(
                (todo) => ({
                    id: todo.id,
                    todo: todo.task,
                    completed:
                        Boolean(
                            todo.is_completed
                        )
                })
            );

        const pagination: PaginationMeta = {
            page,
            perPage,
            total,
            totalPages:
                Math.ceil(
                    total / perPage
                )
        };

        sendSuccessPagination(
            res,
            'Data todo berhasil diambil!',
            data,
            pagination
        );

    } catch (error) {

        console.error(error);

        sendError(
            res,
            'Gagal mengambil data todo.',
            500
        );
    }
};


// GET /todos/:id
export const getTodoById = async (
    req: Request,
    res: Response
): Promise<void> => {

    const id = Number(
        req.params.id
    );

    const userId = res.locals.userId;

    if (Number.isNaN(id)) {
        sendError(
            res,
            'ID todo tidak valid.',
            400
        );
        return;
    }

    try {

        const todo =
            await TodoModel.getById(
                id,
                userId
            );

        if (!todo) {
            sendError(
                res,
                'Todo tidak ditemukan.',
                404
            );
            return;
        }

        const row =
            todo as TodoRow;

        const data: TodoResponse = {
            id: row.id,
            todo: row.task,
            completed:
                Boolean(
                    row.is_completed
                )
        };

        sendSuccess(
            res,
            'Todo berhasil diambil!',
            data
        );

    } catch (error) {

        console.error(error);

        sendError(
            res,
            'Gagal mengambil todo.',
            500
        );
    }
};


// POST /todos
export const createTodo = async (
    req: Request,
    res: Response
): Promise<void> => {

    const payload =
        req.body as CreateTodoRequest;

    const userId =
        res.locals.userId;

    try {

        const newId =
            await TodoModel.create(
                userId,
                payload.task
            );

        const data: TodoResponse = {
            id: newId,
            todo: payload.task,
            completed: false
        };

        sendSuccess(
            res,
            'Todo berhasil ditambahkan!',
            data,
            201
        );

    } catch (error) {

        console.error(error);

        sendError(
            res,
            'Gagal menambahkan todo.',
            500
        );
    }
};


// PUT /todos/:id
export const updateTodo = async (
    req: Request,
    res: Response
): Promise<void> => {

    const id = Number(
        req.params.id
    );

    const userId =
        res.locals.userId;

    const payload =
        req.body as UpdateTodoRequest;

    if (Number.isNaN(id)) {
        sendError(
            res,
            'ID todo tidak valid.',
            400
        );
        return;
    }

    try {

        const affectedRows =
            await TodoModel.update(
                id,
                userId,
                payload.task,
                payload.is_completed
            );

        if (affectedRows === 0) {
            sendError(
                res,
                'Todo tidak ditemukan.',
                404
            );
            return;
        }

        sendSuccess(
            res,
            'Todo berhasil diperbarui!'
        );

    } catch (error) {

        console.error(error);

        sendError(
            res,
            'Gagal memperbarui todo.',
            500
        );
    }
};


// DELETE /todos/:id
export const deleteTodo = async (
    req: Request,
    res: Response
): Promise<void> => {

    const id = Number(
        req.params.id
    );

    const userId =
        res.locals.userId;

    if (Number.isNaN(id)) {
        sendError(
            res,
            'ID todo tidak valid.',
            400
        );
        return;
    }

    try {

        const affectedRows =
            await TodoModel.delete(
                id,
                userId
            );

        if (affectedRows === 0) {
            sendError(
                res,
                'Todo tidak ditemukan.',
                404
            );
            return;
        }

        sendSuccess(
            res,
            'Todo berhasil dihapus!'
        );

    } catch (error) {

        console.error(error);

        sendError(
            res,
            'Gagal menghapus todo.',
            500
        );
    }
};