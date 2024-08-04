import express from 'express';
import AppDataSource from "./data-source";
import dotenv from 'dotenv';

dotenv.config();

console.log(AppDataSource.options)

const port = +process.env.SERVER_PORT! || 3000;
AppDataSource.initialize();

const app = express()

app.listen(port, () => {
    console.log('[server]: Server is running on port: ' + port)
})