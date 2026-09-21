import express from 'express';
import type {
    Request,
    Response,
    NextFunction
} from 'express';

import cors from 'cors';
import { randomUUID } from 'crypto';

import routes from './routes/index.js';

import {
    sendSuccess,
    sendError
} from './utils/response.js';

const app = express();

app.use(
    cors({
        exposedHeaders: ['X-Request-Id']
    })
);

app.use(express.json());

// Membuat X-Request-Id untuk setiap request
app.use((req, res, next) => {
    const requestId = randomUUID();

    res.locals.requestId = requestId;

    res.setHeader(
        'X-Request-Id',
        requestId
    );

    next();
});

// Logging request berdasarkan X-Request-Id
app.use((req, res, next) => {
    console.log(
        `[${res.locals.requestId}] ${req.method} ${req.originalUrl}`
    );

    next();
});

// Route utama
app.get('/', (req, res) => {
    sendSuccess(
        res,
        'Backend Todo Praktikum Berjalan Mulus!'
    );
});

// Semua route API
app.use('/api', routes);

// 404 Handler
app.use((req: Request, res: Response) => {
    sendError(
        res,
        `Route ${req.method} ${req.url} tidak ditemukan!`,
        404
    );
});

// Global Error Handler
app.use(
    (
        err: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        console.error(
            'Terjadi error:',
            err.message
        );

        sendError(
            res,
            'Terjadi kesalahan pada server.',
            500
        );
    }
);

export default app;