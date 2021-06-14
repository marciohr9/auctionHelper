import {NextFunction, Request, Response} from 'express';
import UserEntity from '../entity/User.entity';
import AuthEntity from '../entity/Auth.entity';
import {Hash, Verify}from '../helpers/hashValidator.helper';
import 'dotenv/config';
import { CreateJWT } from '../middlewares/jwtValidator.middleware';
import ErroHandler from '../helpers/error.helper';
class AuthController {
    // Login Controller
    static Login = async (req: Request, res: Response, next: NextFunction) => {
        
        let {email, password} = req.body;
        let user: UserEntity;
        let auth: AuthEntity | any;
        try{

            if(!(email && password)){
                let err = new ErroHandler(400, `email or password is empty`);
                next(err);
            }

            user = await UserEntity.findOneOrFail({where: {email}});
            auth = await AuthEntity.findOne({where: {id: user.id}});
            await Verify(password, auth!.pwdHash).then((obj: boolean)=>{
                if(obj){
                    const token = CreateJWT(user.uuid, user.email);
                    res.status(201).json({message: `Logged`, token});
                }else{
                    let err = new ErroHandler(401,`invalid password. Please try again.`,'Invalid Password');
                    next(err);
                }
            }).catch((err: any)=>{
                if(err !instanceof ErroHandler){
                    next(err);
                }
            });
        } catch (err: any){
            if(err.name === "EntityNotFound"){
                err = new ErroHandler(401,`username ${email} not found. Please try again.`);
                next(err);
            }else{
                next(err);
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