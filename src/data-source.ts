import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import 'dotenv/config';
import { AuthData } from './entities/auth.entity';
import { StudyObject } from './entities/studyObject.entity';
import { Resource } from './entities/resource.entity';
import { Tag } from './entities/tag.entity';
import { Task } from './entities/task';
import { StudyObjectsOfUser } from './entities/studyObjectsOfUser';
import { Event } from './entities/event.entity';

const appDataSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: +process.env.DB_PORT!,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    entities: [User, AuthData, StudyObject, Resource, Tag, Task, Event, StudyObjectsOfUser],
    synchronize: true,
})

export default appDataSource;