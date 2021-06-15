import {NextFunction, Request, Response} from 'express';
import { stringify } from 'querystring';
import UserRepository from "../entity/User.entity";
import ErroHandler from '../helpers/error.helper';
class UserController {

    static SearchProfile = async (req: Request, res: Response, next:NextFunction) => {
        const email = req.query.email;
        let user: UserRepository;
        try{
            if(!email) throw new ErroHandler(400, `parameter email is required`,`Missing Information`);

            user = await UserRepository.findOneOrFail({select:["uuid","email","name","phone","bnetID"],where: {email: email}});
            let data = {user};
            res.status(200).json({data});
        }catch(err){
            if(err.name === "EntityNotFound") err = new ErroHandler(404,`No user found with this email: ${email}`, `Data not Found`);
            next(err);
        }
    }

    static GetProfile = async (req: Request, res: Response, next:NextFunction) => {
        res.status(200).json({ok:'OK'})
    }

    static SetProfile = async (req: Request, res: Response, next:NextFunction) => {
        res.status(200).json({ok:'OK'})
    }

    static UpdateProfile = async (req: Request, res: Response, next:NextFunction) => {
        res.status(200).json({ok:'OK'})
    }
    
}
export default UserController;