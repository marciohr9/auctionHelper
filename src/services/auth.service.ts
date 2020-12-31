import User from '../entity/User.entity';
import Auth from '../entity/Auth.entity';
import crypto from 'crypto';
import { response } from 'express';

const Hash = async (password: string) => {
    const hashed = new Promise<string>((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString("hex");

        crypto.scrypt(password, salt,64,(err, derivedKey)=> {
            if(err) reject(err);
            resolve(`${salt}:${derivedKey.toString("hex")}`)
        });
    });
    return hashed;
}

const Verify = async (password: string, hash: string) => {
    const verified = new Promise<boolean>((resolve, reject) => {
        const [salt, key] = hash.split(":");
        crypto.scrypt(password, salt,64,(err, derivedKey) => {
            if(err) reject(err);
            resolve(key == derivedKey.toString("hex"));
        });
    });
    return verified;
}

const Validation = async (): Promise<any> => {
    return true;
}

const Login = async (email: string, password: string): Promise<any> => {
    const user = await User.findOne({where: {email}});
    if(user){
        const auth = await Auth.findOne({where: {id: user.id}});
        const valid = await Verify(password, auth!.pwdHash).then((res)=>{
            if(res){
                return {status: res, mensage: `Logged`};
            }else{
                return {status: res, mensage: `Invalid password.`};
            }
        }).catch((err)=>{
                return {status: false, error_log: err}
        });
        return valid;
    }else{
        return {status: false, mensage: `invalid user with email ${email}`};
    }
}

export default Auth;
export {
    Login
};