import { Router } from 'express';

import authRoutes from './authRoutes.js';

import todoRoutes from './todoRoutes.js';

const router = Router();

router.use('/auth', authRoutes);

router.use('/todos', todoRoutes);

export default router;