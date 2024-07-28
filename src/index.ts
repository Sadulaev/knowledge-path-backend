import express, { Express, Request, Response } from "express";
import AppDataSource from "./data-source";
import dotenv from 'dotenv';

dotenv.config();

console.log(AppDataSource.options)

const app: Express = express();
const port = +process.env.SERVER_PORT! || 3000;
AppDataSource.initialize();


app.get("/", (req: Request, res: Response) => {
    res.send("Express + Typescript server");
});

app.listen(port, () => {
    console.log('[server]: Server is running on port: ' + port)
})