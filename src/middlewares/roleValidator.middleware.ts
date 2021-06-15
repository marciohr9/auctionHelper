import {Request, Response, NextFunction} from 'express';
import UserRepository from '../entity/User.entity';
import ErroHandler from '../helpers/error.helper';

const CheckRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //# get UUID from jwt middleware payload
        const uuid = res.locals.jwtPayload.uuid;

        try{
            let user = await UserRepository.createQueryBuilder("user")
                                .innerJoinAndSelect('user.auth','auth', 'auth.logDeleted_at is NULL')
                                .where("user.uuid = :uuid", {uuid: uuid}).getOne();
            if(roles.indexOf(user!.auth.role) > -1){ 
                next();
            }else{
                throw new ErroHandler(401, 'your user dont have permission to this action.','No Permission!');
            }
        }catch(err){
            next(err);
        }
    };
};
export {CheckRole};