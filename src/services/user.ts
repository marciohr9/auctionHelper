import { getManager, getRepository } from "typeorm";
import User from "../entity/User.entity";

const buscarUser = async (userId: number) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(userId);
    return user;
}

export {
    buscarUser
}