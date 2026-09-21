import type { Response } from 'express';

import type {
    PaginationMeta
} from '../types/common.js';

const createTimestamp = (): string => {
    return new Date().toISOString();
};

export const sendSuccess = <T>(
    res: Response,
    message: string,
    data?: T,
    status = 200
): void => {

    res.status(status).json({
        success: true,
        message,
        data: data ?? {},
        meta: {
            timestamp:
                createTimestamp()
        }
    });
};

export const sendSuccessPagination = <T>(
    res: Response,
    message: string,
    data: T,
    pagination: PaginationMeta,
    status = 200
): void => {

    res.status(status).json({
        success: true,
        message,
        data,
        meta: {
            timestamp:
                createTimestamp(),
            pagination
        }
    });
};

export const sendError = (
    res: Response,
    message: string,
    status = 500
): void => {

    res.status(status).json({
        success: false,
        message,
        data: null,
        meta: {
            timestamp:
                createTimestamp()
        }
    });
};