import { Router } from 'express';
import { register, login } from '../controllers/authController';
import {
    validateRegister,
    validateLogin
} from '../middlewares/validator';

const router = Router();

// POST /api/auth/register
router.post(
    '/register',
    validateRegister,
    register
);

// POST /api/auth/login
router.post(
    '/login',
    validateLogin,
    login
);

export default router;