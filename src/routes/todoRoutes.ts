import { Router } from 'express';

import {
    getTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
} from '../controllers/todoController';

import {
    validateTodo,
    validateUpdateTodo
} from '../middlewares/validator';

const router = Router();

// GET /api/todos
router.get(
    '/',
    getTodos
);

// GET /api/todos/:id
router.get(
    '/:id',
    getTodoById
);

// POST /api/todos
router.post(
    '/',
    validateTodo,
    createTodo
);

// PUT /api/todos/:id
router.put(
    '/:id',
    validateUpdateTodo,
    updateTodo
);

// DELETE /api/todos/:id
router.delete(
    '/:id',
    deleteTodo
);

export default router;