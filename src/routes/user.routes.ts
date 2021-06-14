import {Router, Request, Response} from 'express';
import UserController from '../controller/user.controller';
import {CheckJWT} from '../middlewares/jwtValidator.middleware';
import {CheckRole} from '../middlewares/roleValidator.middleware';

const userRouter = Router();

//PROFILE CRUD
userRouter.route('/myProfile/')
    .get([CheckJWT,CheckRole(["USER","MANAGER","ADMIN"])],UserController.GetProfile)
    .post([CheckJWT,CheckRole(["USER","MANAGER","ADMIN"])],UserController.SetProfile)
    .put([CheckJWT,CheckRole(["USER","MANAGER","ADMIN"])],UserController.UpdateProfile);

// TESTE
userRouter.route('/profiles')
    .get([CheckJWT,CheckRole(["MANAGER"])],UserController.SearchProfile);

export default userRouter;