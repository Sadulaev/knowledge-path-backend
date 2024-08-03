import { Column, Entity, ManyToMany } from "typeorm";
import { User } from "./user.entity";
import { StudyObject } from "./studyObject.entity";

@Entity({ name: 'study_objects_of_user' })
export class StudyObjectsOfUser {
    @ManyToMany(() => User, (user) => user.studyingObjects)
    userId: User;

    @ManyToMany(() => StudyObject, (object) => object.studyingUsers)
    objectId: StudyObject;

    @Column({ name: 'start_date' })
    startDate: string;

    @Column({ name: 'end_date' })
    updateDate: string
}