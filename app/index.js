import express from 'express';
import cors from 'cors';
import router from './routers/index.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET,PUT,POST,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json());

app.use(router);

export default app;
