import cors from 'cors';
import express from 'express';

const app = express();

const allowedOrigins = ['http://localhost:3000', 'http://teleporter:3000'];

const corsOptionsDelegate = (req, callback) => {
    let corsOptions = {};
    console.log(req.header('Origin'));
    if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

export const CORS = cors();
export const corsWithOptions = cors(corsOptionsDelegate);
