import {config} from 'dotenv';
import {getManager, BaseEntity, createConnection } from 'typeorm';
import User from '../entities/User';

config({
    path: process.env.NODE_ENV === 'dev' ? '../../.env.test' : '../../.env',
});
  
createConnection(require('../../ormconfig')).then(conn =>
    BaseEntity.useConnection(conn)
);

const teste = async () => {
    const entityManager = getManager(); 
    const user = await entityManager.findOne(User, 1);
    console.log(user);
}

teste();