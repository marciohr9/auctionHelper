import { Router } from 'express';
import { AdvancedConsoleLogger } from 'typeorm';
import AuthController from '../controller/auth.controller';
const loginRouter = Router();

// LOGIN
loginRouter.post('/login', AuthController.Login);

// NOVO USUARIO
loginRouter.post('/newUser', AuthController.Register);
// RECUPERAR USER
loginRouter.post('/recover', (req,res) => {
    res.status(200).json({mensage: 'email enviado!'});
});

export default loginRouter;