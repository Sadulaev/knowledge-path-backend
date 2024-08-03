import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudyObject } from "./studyObject.entity";
import { User } from "./user.entity";

@Entity({ name: 'event' })
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'date' })
    date: number;

    @ManyToOne(() => User, (user) => user.events)
    user: User;

    @ManyToOne(() => StudyObject, (object) => object.events)
    studyObject: StudyObject;
}