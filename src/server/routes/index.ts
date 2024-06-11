import { Router } from "express";
import {StatusCodes} from 'http-status-codes'

const router = Router();

router.get('/', (req, res) => {
    return res.json('Olá, DEV!');
})

router.post('/teste', (req, res) => {
    console.log(req);
    return res.status(StatusCodes.ACCEPTED).json('Olá, DEV!');
})

export {router}