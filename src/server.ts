import 'dotenv/config';
import 'reflect-metadata';
import './database';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import cors from 'cors';
import helmet from "helmet";

// creating express application stance
const app = express();
//calling midwares
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
// setting routes
app.use(routes);
//listening http requests on configured port
app.listen(process.env.APP_PORT, ()=>{
    console.log('listening....');
})

