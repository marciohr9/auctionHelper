import express from 'express';
import {buscarUser} from '../services/user';

const router = express.Router();

// LOGIN
router.route('/login')
    .post((req,res)=>{
        res.status(200).json({mensage: 'efetuar login'});
    })
    .get((req, res) => {
        res.status(200).json({mensage: 'get someting'});
    });
// NOVO USUARIO
router.post('/register', (req, res) => {
    res.status(200).json({mensage: 'usuário cadastrado!'});
});
// RECUPERAR USER
router.post('/recover', (req,res)=>{
    res.status(200).json({mensage: 'email enviado!'});
});

export default router;