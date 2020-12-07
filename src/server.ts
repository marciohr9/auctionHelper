import 'dotenv/config';
import 'reflect-metadata';
import './database';
import express from 'express';
import routes from './routes/index';
import useRoute from './routes/user.routes';
import loginRoute from './routes/login.routes';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(routes);
app.listen(process.env.APP_PORT, ()=>{
    console.log('listening....');
})

