import {createConnection} from 'typeorm';

require('dotenv').config({
    path: process.env.NODE_ENV === "development" ? "config/.env.test" : "config/.env"
});
const connection = createConnection().then(() =>{
        console.log(`Conectado ao ${process.env.DB_DATABASE}`);
});