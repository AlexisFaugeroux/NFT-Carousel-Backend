import express from 'express';
import cors from 'cors';
import router from './routers/index.js';

const app = express();

app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

// app.options('*', cors());

app.use(router);

export default app;
