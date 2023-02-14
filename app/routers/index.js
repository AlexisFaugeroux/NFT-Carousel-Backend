import express from 'express';
import apiController from '../controllers/apiController';

const router = express.Router();

router.get('/getTokens', apiController.getTokens);
