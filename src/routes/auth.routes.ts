import { Router } from 'express';
import AuthController from '../controller/auth.controller';
const loginRouter = Router();

// LOGIN
loginRouter.post('/login', AuthController.Login);
// NOVO USUARIO
loginRouter.post('/newUser', AuthController.Register);
// RECUPERAR USER
loginRouter.post('/recover', AuthController.Recover);

export default loginRouter;