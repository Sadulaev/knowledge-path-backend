import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudyObject } from "./studyObject.entity";
import { StudyObjectsOfUser } from "./studyObjectsOfUser";
import { Event } from "./event.entity";
import { Task } from "./task";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', nullable: true })
    name: string;

    @Column({ name: 'email', nullable: true })
    email: string;

    @Column({ name: 'password', nullable: true })
    password: string;

    @Column({ name: 'user_type', default: 'free' })
    type: 'logged' | 'free';

    @Column({ name: 'is_first_entrance', default: true })
    isFirstEntrance: boolean;

    @OneToMany(() => StudyObject, (object) => object.author)
    createdStudyObjects: StudyObject[];

    @ManyToMany(() => StudyObjectsOfUser, (studyingObject) => studyingObject.userId)
    studyingObjects: StudyObjectsOfUser[];

    @OneToMany(() => Event, (event) => event.user)
    events: Event[];

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];
}