import {NextFunction, Request, Response} from 'express';
import UserEntity from '../entity/User.entity';
import AuthEntity from '../entity/Auth.entity';
import {Hash, Verify}from '../helpers/passwordHash.helper';
import 'dotenv/config';
import { CreateJWT } from '../middlewares/jwtValidator.middleware';
import ErroHandler from '../helpers/error.helper';
class AuthController {
    // ## Login Controller
    static Login = async (req: Request, res: Response, next: NextFunction) => {
        
        // Taking auth data from requisition body
        let {email, password} = req.body;
        let user: UserEntity;
        let auth: AuthEntity | any;
        try{

            if(!(email && password)){
                throw new ErroHandler(400,`email or password is empty`);
            }

            user = await UserEntity.findOneOrFail({select:["id","uuid","email"],where: {email}});
            auth = await AuthEntity.findOne({where: {id: user.id}});
            await Verify(password, auth!.pwdHash).then((obj: boolean)=>{
                if(obj){
                    const token = CreateJWT(user.uuid, user.email);
                    res.status(201).json({message: `Logged`, token});
                }else{
                    throw new ErroHandler(401,`invalid password. Please try again.`,'Invalid Password');
                }
            });
        } catch (err){
            if(err.name === "EntityNotFound"){
                err = new ErroHandler(401,`username ${email} not found. Please try again.`);
                next(err);
            }else{
                next(err);
            }
        }
    }
    //## New User Registration Controller
    static Register = async (req: Request, res: Response) => {

    }
    //#
    // Recovery of password Controller
    static Recover = async (req: Request, res: Response) => {

    }
    //#
}

export default AuthController;