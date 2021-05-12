import {Router, Request, Response} from 'express';
import UserController from '../controller/user.controller';
import {CheckJWT} from '../middlewares/jwtValidator.middleware';
import {CheckRole} from '../middlewares/roleValidator.middleware';

const userRouter = Router();


// TESTE
userRouter.route('/')
    .get([CheckJWT,CheckRole(["USER"])],UserController.SearchOne);

//PROFILE CRUD
userRouter.route('/profile/')
    .get((req, res)=>{
        res.status(200).json({mensage: 'pesquisa profile'})
    })
    .post((req,res)=>{
        res.status(200).json({mensage: 'cadastra profile'})
    })
    .put((req,res)=>{
        res.status(200).json({mensage: 'atualiza contatos'})
    });

export default userRouter;