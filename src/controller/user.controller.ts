import {Request, Response} from 'express';
import { stringify } from 'querystring';
import UserRepository from "../entity/User.entity";
class UserController {

    static SearchOne = async (req: Request, res: Response) => {
        const email = req.query.email;
        let user: UserRepository;

        if(!email) res.status(400).json({mensage: 'parameter email is required'});

        try{
            user = await UserRepository.findOneOrFail({where: {email: email}});
            if(res.getHeader("newToken")){
                res.status(200).json({data:{uuid: user.uuid, email: user.email, name: user.name, Bnet: user.bnetID, phone: user.phone}, __tokenInfo:{ expiring: true, mensage: `ur token are expiring in ${res.getHeader("expireIn")} seconds, change for the new one`}});
            }
            res.status(200).json({data:{uuid: user.uuid, email: user.email, name: user.name, Bnet: user.bnetID, phone: user.phone}, __tokenInfo:{ expiring : false}});
        }catch(err){
            if(err.name === "EntityNotFound") res.status(404).json({mensage: `Nenhum usuário encontrado com o email: ${email}`});
            else res.status(500).json({mensage: 'ocorreu um erro inesperado.'});
        }
    }
    
}
export default UserController;