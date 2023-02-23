import express from 'express';
// import cors from 'cors';
import router from './routers/index.js';

const app = express();

// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//     methods: 'GET,PUT,POST,OPTIONS',
//     allowedHeaders: 'Content-Type',
// }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Content-Type');
    next();
});

app.use(express.json());

app.use(router);

export default app;
