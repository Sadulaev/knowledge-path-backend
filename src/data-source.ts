import 'reflect-metadata';
import { DataSource } from 'typeorm';


const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: +process.env.DB_PORT!,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB,
    synchronize: true,
    logging: true
})

export default AppDataSource;