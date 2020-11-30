import express from 'express';
import {buscarUser} from '../services/user';

const router = express.Router();

router.get('/', (req, res, next) => {
    buscarUser(1).then((user)=>{
        console.log(user);
        res.status(200).send(user);
    }).catch((err)=>{
        throw(err);
    });
    
});

export default router;