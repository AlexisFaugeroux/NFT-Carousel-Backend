import express from 'express';
import apiController from '../controllers/apiController.js';

const router = express.Router();

router.post('/owner', apiController.getTokensByOwner);

router.post('/creator', apiController.getTokensByCreator);

router.post('/candymachine', apiController.getCandyMachine);

export default router;
