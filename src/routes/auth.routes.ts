import { Router } from 'express';
import AuthController from '../controller/auth.controller';
const loginRouter = Router();

//# login route
loginRouter.post('/login', AuthController.Login);
//# create new login route
loginRouter.post('/newUser', AuthController.Register);
//# recover login route
loginRouter.post('/recover', AuthController.Recover);

export default loginRouter;