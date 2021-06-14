import loginRouter from './auth.routes';
import userRouter from './user.routes';
import {Router} from 'express';
import ErroHandler from '../helpers/error.helper';
const routes = Router();

routes.use('/user', userRouter);
routes.use('/', loginRouter);

//## rota default para rota não encontrada.
routes.use('*',(req, res, next)=>{
    let err = new ErroHandler(404,'Route not found','U are lost?');
    next(err);
});

export default routes;