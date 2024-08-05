import express from 'express';
import AppDataSource from "./data-source";
import dotenv from 'dotenv';
import authRouter from './routes/auth.route'

dotenv.config();

console.log(AppDataSource.options)

const port = +process.env.SERVER_PORT! || 3000;
AppDataSource.initialize();

const app = express()

app.use(express.json())
app.use('/api/v1', authRouter)

app.listen(port, () => {
    console.log('[server]: Server is running on port: ' + port)
})