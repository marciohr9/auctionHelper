import { Router } from 'express';
import { AdvancedConsoleLogger } from 'typeorm';
import { Login } from '../controller/auth.controller';
const loginRouter = Router();

// LOGIN
loginRouter.post('/login', async (req,res, next) => {
    try{
        const {email, password} = req.body;
        Login(email,password).then((obj) => {
            if(obj.authorized){
                res.status(201).json(obj);
            }else{
                res.status(401).json(obj);
            }
        }).catch((err) => {
            res.status(500).json(err);
        });
    }catch(err){
        res.status(500).json({mensage: 'unespected error, try again', error: err});
    }
});

// NOVO USUARIO
loginRouter.post('/register',(req, res) => {
    try{
        const {email, password, bnetTag} = req.body
    }catch(err){
        res.status(501).json({mensage: 'erro inesperado.'});
    }
});
// RECUPERAR USER
loginRouter.post('/recover', (req,res) => {
    res.status(200).json({mensage: 'email enviado!'});
});

export default loginRouter;