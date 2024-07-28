import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import 'dotenv/config';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: +process.env.DB_PORT!,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    entities: [User],
    synchronize: true,
})

export default AppDataSource;