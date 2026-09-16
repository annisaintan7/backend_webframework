import { Router } from 'express';

import authRoutes from './authRoutes';
import todoRoutes from './todoRoutes';

import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

// Route authentication
router.use(
    '/auth',
    authRoutes
);

// Route todo membutuhkan token
router.use(
    '/todos',
    verifyToken,
    todoRoutes
);

export default router; 