import { getManager, getRepository } from "typeorm";
import User from "../entity/User.entity";

const buscarUser = async (userId: number) => {
    const user = await User.findOneOrFail({where: {id: userId}});
    return user;
}

export {
    buscarUser
}