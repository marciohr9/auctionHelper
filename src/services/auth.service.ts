import { response } from 'express';
import User from '../entity/User.entity';

const Auth = async () => {
    return true;
}
const Login = async (email: string, password: string) => {
    const user = await User.findOne({where: {email}});
    if(user){
        return {status: true, user: user};
    }else{
        return {status: false, mensage: `invalid user with email ${email}`};
    }
}

export default Auth;
export {
    Login
};