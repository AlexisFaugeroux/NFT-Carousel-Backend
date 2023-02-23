import express from 'express';
import cors from 'cors';
import router from './routers/index.js';

const app = express();

const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(router);

export default app;
