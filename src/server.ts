import 'dotenv/config';
import 'reflect-metadata';
import './database';
import createError from 'http-errors';
import express from 'express';
import useRoute from './routes/user';
import cors from 'cors';
const app = express();

app.use(cors());
app.use('/user', useRoute);
app.listen(process.env.APP_PORT, ()=>{
    console.log('listening....');
})

