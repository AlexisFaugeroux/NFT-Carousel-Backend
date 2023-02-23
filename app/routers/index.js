import express from 'express';
import apiController from '../controllers/apiController.js';
import { corsWithOptions } from '../helpers/cors.js';

const router = express.Router();

router.get('/', (req, res) => {
    console.log('Hello');
    res.send('Hello');
});

router.route('/owner')
    .options(corsWithOptions, (req, res) => { res.sendStatus(200); })
    .post(corsWithOptions, apiController.getTokensByOwner);

router.post('/creator', apiController.getTokensByCreator);

router.route('/candymachine')
    .options(corsWithOptions, (req, res) => { res.sendStatus(200); })
    .post(corsWithOptions, apiController.getCandyMachine);

export default router;
