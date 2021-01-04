import {Router} from 'express';
import {buscarUser} from '../controller/user.controller';

const userRouter = Router();


// TESTE
userRouter.route('/')
    .post((req,res)=>{
        res.status(200).json({mensage: 'efetuar login'});
    })
    .get((req, res) => {
        buscarUser(1).then((user)=>{
            console.log(user);
            res.status(200).json(user);
        }).catch((err)=>{
            throw(err);
        });
    
    });

// GERENCIA PROFILE
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