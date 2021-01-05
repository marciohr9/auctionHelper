import {Request, Response} from 'express';
import UserEntity from '../entity/User.entity';
import AuthEntity from '../entity/Auth.entity';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
class AuthController {

    private Hash = async (password: string) => {
        return new Promise<string>((resolve, reject) => {
            const salt = crypto.randomBytes(16).toString("hex");

            crypto.scrypt(password, salt,64,(err, derivedKey)=> {
                if(err) reject(err);
                resolve(`${salt}:${derivedKey.toString("hex")}`)
            });
        });
    }

    private Verify = async (password: string, hash: string) => {
        return new Promise<boolean>((resolve, reject) => {
            const [salt, key] = hash.split(":");
            crypto.scrypt(password, salt,64,(err, derivedKey) => {
                if(err) reject(err);
                resolve(key == derivedKey.toString("hex"));
            });
        });
    }

    static Login = async (req: Request, res: Response) => {
        
        let {email, password} = req.body;
        let user: UserEntity;
        let auth: AuthEntity;
        const jwtSecret = process.env.JWT_SECRET;

        const validation = new AuthController();

        if(!(email && password)){
            res.status(400).json({authorized: false, mensage: `empity values`});
        }
        try{
            user = await UserEntity.findOneOrFail({where: {email}});
            auth = await AuthEntity.findOneOrFail({where: {id: user.id}});  
            await validation.Verify(password, auth!.pwdHash).then((obj)=>{
                if(obj){
                    const token = jwt.sign(
                        {userUuid: user.uuid, username: user.email}, `${jwtSecret}`, { expiresIn: "168h"}
                    )
                    res.status(201).json({authorized: obj, mensage: `Logged`, token});
                }else{
                    res.status(401).json({authorized: obj, mensage: `Invalid password.`});
                }
            }).catch((err)=>{
                res.status(500).json({authorized: false, mensage: 'unespected error on authentication', error_log: err});
            });
        } catch (error){
            res.status(401).json({authorized: false, mensage: `invalid user with email ${email}`});
        }
    }

    static Register = async (req: Request, res: Response) => {
        
    }
}

export default AuthController;