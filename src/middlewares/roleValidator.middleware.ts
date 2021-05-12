import {Request, Response, NextFunction} from 'express';
import UserRepository from '../entity/User.entity';

const CheckRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //get UUID from jwt middleware
        const uuid = res.locals.jwtPayload.uuid;

        try{
            let user = await UserRepository.createQueryBuilder("user")
                                .innerJoinAndSelect('user.auth','auth', 'auth.logDeleted_at is NULL')
                                .where("user.uuid = :uuid", {uuid: uuid}).getOne();
            if(roles.indexOf(user!.auth.role) > -1){ 
                next();
            }else{
                res.status(401).json({auth: false, mensage: 'user dont have permission to this function'});
            }
        }catch(err){
            console.log(err);
            res.status(501).json({mensage: 'unespected error!'});
        }
    };
};
export {CheckRole};