import {config} from 'dotenv';
import {BaseEntity, createConnection } from 'typeorm';
config({
    path: process.env.NODE_ENV === 'dev' ? '../../.env.test' : '../../.env',
});
  
createConnection(require('../../ormconfig')).then(conn =>
    BaseEntity.useConnection(conn)
);