import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const hostName = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME || 'test';

const dbUrl = `mongodb://${hostName}:${port}/${dbName}`;


mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.info('Connected to DB');
});

export default db;
