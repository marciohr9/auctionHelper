import { Router } from 'express';
import { AdvancedConsoleLogger } from 'typeorm';
import { Login } from '../services/auth.service';
const loginRouter = Router();

// LOGIN
loginRouter.post('/login', async (req,res, next) => {
    try{
        const {email, password} = req.body;
        Login(email,password).then((auth) => {
            if(auth.status){
                res.status(201).json({auth: auth.status, mensage: auth.mensage});
            }else{
                res.status(401).json({auth: auth.status, mensage: auth.mensage});
            }
        }).catch((err) => {
            
            res.status(500).json({auth: err.status, mensage: 'unespected error on authentication', error: err.error_log});
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