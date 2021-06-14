import {Request, Response, NextFunction} from 'express';
import UserRepository from '../entity/User.entity';
import ErroHandler from '../helpers/error.helper';

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
                let err = new ErroHandler(401, 'your user dont have permission to this function','No Permission!');
                next(err);
            }
        }catch(err){
            if(err !instanceof ErroHandler){
                next(err);
            }
        }
    };
};
export {CheckRole};