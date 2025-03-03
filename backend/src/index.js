import connectDB from './db/database.js';
import dotenv from 'dotenv';
import { app } from './app.js';

dotenv.config({ path: './.env' });

const Port = 3000;

connectDB()
    .then(() => {
        app.listen(Port, () => {
            console.log(`Successfully connected at Port ${Port}`);
        });
    })
    .catch((error) => {
        console.log('MongoDB connection failed:', error);
    });
