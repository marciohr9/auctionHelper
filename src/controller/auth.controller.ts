import {Request, Response} from 'express';
import UserEntity from '../entity/User.entity';
import AuthEntity from '../entity/Auth.entity';
import {Hash, Verify}from '../middlewares/hashValidator.middleware';
import 'dotenv/config';
import { CreateJWT } from '../middlewares/jwtValidator.middleware';
class AuthController {
    // Login Controller
    static Login = async (req: Request, res: Response) => {
        
        let {email, password} = req.body;
        let user: UserEntity;
        let auth: AuthEntity;

        if(!(email && password)){
            res.status(400).json({authorized: false, mensage: `empity values`});
        }
        try{
            user = await UserEntity.findOneOrFail({where: {email}});
            auth = await AuthEntity.findOneOrFail({where: {id: user.id}});  
            await Verify(password, auth!.pwdHash).then((obj: boolean)=>{
                if(obj){
                    const token = CreateJWT(user.uuid, user.email);
                    res.status(201).json({authorized: obj, mensage: `Logged`, token});
                }else{
                    res.status(401).json({authorized: obj, mensage: `Invalid password.`});
                }
            }).catch((err: any)=>{
                res.status(500).json({authorized: false, mensage: 'unespected error on authentication', error_log: err});
            });
        } catch (error){
            res.status(401).json({authorized: false, mensage: `invalid user with email ${email}`});
        }
    }
    //#
    // New User Registration Controller
    static Register = async (req: Request, res: Response) => {

    }
    //#
    // Recovery of password Controller
    static Recover = async (req: Request, res: Response) => {

    }
    //#
}

export default AuthController;