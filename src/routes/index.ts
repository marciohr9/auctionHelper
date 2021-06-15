import loginRouter from './auth.routes';
import userRouter from './user.routes';
import {Router} from 'express';
import ErroHandler from '../helpers/error.helper';
const routes = Router();

//# routes to authentication
routes.use('/', loginRouter);
//# routes to work with user data
routes.use('/user', userRouter);
//# default route to wrong or not implemented routes
routes.use('*',(req, res, next)=>{
    let err = new ErroHandler(404,'Route not found','U are lost?');
    next(err);
});

export default routes;