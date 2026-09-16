import express from 'express';
import cors from 'cors';

import apiRoutes from './routes/index';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Backend Todo Praktikum Berjalan Mulus!'
    });
});

app.use('/api', apiRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan!'
    });
});

export default app;