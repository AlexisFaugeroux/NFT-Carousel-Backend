import express from 'express';
import apiController from '../Controllers/apiController';

const router = express.Router();

router.get('/getTokens', apiController.getTokens);
