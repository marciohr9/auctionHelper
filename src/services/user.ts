import { getManager } from "typeorm";
import User from "../entities/User";

const entityManager = getManager();

const buscarUser = async (userId: number) => {
    const user = await entityManager.findOne(User, userId);
    console.log(user);
    return user;
}

export {
    buscarUser
}