import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST 
const DB_PORT = process.env.DB_PORT 
const DB_NAME = process.env.DB_NAME 

const dbUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;


mongoose.connect(dbUrl).then(() => {
    console.info('Connected to DB');
}).catch((e) => {
    console.error('Connection error', e.message);
});

const db = mongoose.connection;


export default db;
