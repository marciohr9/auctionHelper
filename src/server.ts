import 'dotenv/config';
import 'reflect-metadata';
import './database';
import express from 'express';
import useRoute from './routes/user.routes';
import loginRoute from './routes/login.routes';
import cors from 'cors';
const app = express();

app.use(cors());
app.use('/', loginRoute);
app.use('/user', useRoute);
app.listen(process.env.APP_PORT, ()=>{
    console.log('listening....');
})

