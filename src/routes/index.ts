import loginRouter from './auth.routes';
import userRouter from './user.routes';
import {Router} from 'express';
const routes = Router();

routes.use('/user', userRouter);
routes.use('/', loginRouter);

export default routes;