import {Router, Request, Response} from 'express';
import UserController from '../controller/user.controller';
import {CheckJWT} from '../middlewares/jwtValidator.middleware';
import {CheckRole} from '../middlewares/roleValidator.middleware';

const userRouter = Router();

//# user profile CRUD route
userRouter.route('/myProfile/')
    .get([CheckJWT,CheckRole(["USER","MANAGER","ADMIN"])],UserController.GetProfile)
    .post([CheckJWT,CheckRole(["USER","MANAGER","ADMIN"])],UserController.SetProfile)
    .put([CheckJWT,CheckRole(["USER","MANAGER","ADMIN"])],UserController.UpdateProfile);

//# search all profiles route
userRouter.route('/profiles')
    .get([CheckJWT,CheckRole(["MANAGER","ADMIN"])],UserController.SearchProfile);

export default userRouter;