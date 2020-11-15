import {createConnection} from 'typeorm';

require('dotenv').config({
    path: process.env.NODE_ENV === "development" ? "config/.env.test" : "config/.env"
});
const connection = createConnection('db1Connection').then(() =>{
        console.log(`Conectado ao ${process.env.DB_DATABASE}`);
});