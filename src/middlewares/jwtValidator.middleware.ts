import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import ErroHandler from '../helpers/error.helper';

const CheckJWT = (req: Request, res: Response, next: NextFunction) => {
    const [key, token] = <Array<string>>req.headers.authorization?.split(' ');
    let jwtPayload;
    const jwtSecret = process.env.JWT_SECRET;
    try{

        if(!token){
            throw Error("requisition without token is unauthorized, please log in");
        }

        jwtPayload = <any>jwt.verify(token, `${jwtSecret}`);
        res.locals.jwtPayload = jwtPayload;
        
        if(jwtPayload.exp){
            let mathDateNow = Math.floor(Date.now() / 1000);
            if((jwtPayload.exp - mathDateNow) <= 300){
                res.setHeader("__token-expiring",1);
                res.setHeader("__expireIn", jwtPayload.exp - mathDateNow);
            }else{
                res.setHeader("__token-expiring",0);
            }
        }
    }catch(error){
        let err = new ErroHandler(401,error.message,'Not Autorized!');
        next(err);
    }
    next();
};

const CreateJWT = (uuid: string, email: string) => {
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({uuid, username: email, exp:Math.floor(Date.now() / 1000) + (60 * 60)}, `${jwtSecret}`);
    return token;
}

export {CheckJWT, CreateJWT};