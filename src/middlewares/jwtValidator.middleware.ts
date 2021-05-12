import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const CheckJWT = (req: Request, res: Response, next: NextFunction) => {
    const [key, token] = <Array<string>>req.headers.authorization?.split(' ');
    let jwtPayload;
    let jwtSecret = process.env.JWT_SECRET;

    if(!token){
        res.status(401).json({auth: false, mensage: 'requisition without token unauthorized'});
        return;
    }

    try{
        jwtPayload = <any>jwt.verify(token, `${jwtSecret}`);
        res.locals.jwtPayload = jwtPayload;    
        
        if(jwtPayload.exp){
            let mathDateNow = Math.floor(Date.now() / 1000);
            if((jwtPayload.exp - mathDateNow) <= 300){
                const {uuid, username} = jwtPayload;
                const newToken = CreateJWT(jwtPayload.uuid,jwtPayload.username);
                res.setHeader("newToken", newToken);
                res.setHeader("expireIn", jwtPayload.exp - mathDateNow);
            }
        }
    }catch(error){
        res.status(401).json({auth: false, mensage: 'invalid token'});
        return;
    }
    next();
};

const CreateJWT = (uuid: string, email: string) => {
    let jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({uuid, username: email, exp:Math.floor(Date.now() / 1000) + (60 * 60)}, `${jwtSecret}`);
    return token;
}

export {CheckJWT, CreateJWT};