import type {
    Request,
    Response,
    NextFunction
} from 'express';

import type {
    RegisterRequest,
    LoginRequest
} from '../types/auth.js';

import type {
    CreateTodoRequest,
    UpdateTodoRequest
} from '../types/todo.js';

import {
    sendError
} from '../utils/response.js';

export const validateRegister = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const payload =
        req.body as RegisterRequest;

    if (
        !payload.username ||
        !payload.email ||
        !payload.password
    ) {
        sendError(
            res,
            'Username, email, dan password wajib diisi!',
            400
        );
        return;
    }

    if (!payload.email.includes('@')) {
        sendError(
            res,
            'Format email tidak valid!',
            400
        );
        return;
    }

    next();
};

export const validateLogin = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const payload =
        req.body as LoginRequest;

    if (
        !payload.username ||
        !payload.password
    ) {
        sendError(
            res,
            'Username dan password wajib diisi!',
            400
        );
        return;
    }

    next();
};

export const validateTodo = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const payload =
        req.body as CreateTodoRequest;

    if (
        !payload.task ||
        typeof payload.task !== 'string'
    ) {
        sendError(
            res,
            'Task wajib diisi!',
            400
        );
        return;
    }

    next();
};

export const validateUpdateTodo = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const payload =
        req.body as UpdateTodoRequest;

    if (
        !payload.task ||
        typeof payload.task !== 'string'
    ) {
        sendError(
            res,
            'Task wajib diisi!',
            400
        );
        return;
    }

    if (
        typeof payload.is_completed !== 'boolean'
    ) {
        sendError(
            res,
            'is_completed harus berupa boolean!',
            400
        );
        return;
    }

    next();
};