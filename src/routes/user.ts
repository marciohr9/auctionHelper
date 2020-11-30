import express from 'express';
import { getManager } from 'typeorm';
import User from '../entities/User';
import {buscarUser} from '../services/user';

const router = express.Router();

router.get('/', (req, res, next) => {
    buscarUser(1).then((user)=>{
        res.status(200).send(user);
    });
    
});

export default router;