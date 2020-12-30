import 'dotenv/config';
import 'reflect-metadata';
import './database';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import cors from 'cors';
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(routes);
app.listen(process.env.APP_PORT, ()=>{
    console.log('listening....');
})

