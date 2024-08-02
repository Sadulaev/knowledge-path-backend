import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudyObject } from "./studyObject.entity";
import { StudyObjectsOfUser } from "./studyObjectsOfUser";

@Entity({ name: 'user' })
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
}