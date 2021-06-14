import {Request, Response} from 'express';
import UserEntity from '../entity/User.entity';
import AuthEntity from '../entity/Auth.entity';
import {Hash, Verify}from '../helpers/hashValidator.helper';
import 'dotenv/config';
import { CreateJWT } from '../middlewares/jwtValidator.middleware';
class AuthController {
    // Login Controller
    static Login = async (req: Request, res: Response) => {
        
        let {email, password} = req.body;
        let user: UserEntity;
        let auth: AuthEntity;
        try{

            if(!(email && password)){
                throw "empty";
            }

            user = await UserEntity.findOneOrFail({where: {email}});
            auth = await AuthEntity.findOneOrFail({where: {id: user.id}});
            await Verify(password, auth!.pwdHash).then((obj: boolean)=>{
                if(obj){
                    const token = CreateJWT(user.uuid, user.email);
                    res.status(201).json({message: `Logged`, token});
                }else{
                    throw "invalid-password";
                }
            }).catch((err: any)=>{
                if(err === "invalid-password"){
                    res.status(401).json({message: `invalid password. Please try again.`})
                }else{
                    res.status(500).json({message: 'unespected error on authentication', error: err});
                }
            });
        } catch (err: any){
            if(err === "empty"){
                res.status(400).json({message: `empity values`});
            }else if(err.name === "EntityNotFound"){
                res.status(401).json({message: `username ${email} not found. Please try again`});
            }else{
                res.status(500).json({message: `unespected error`, error: err});
            }
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