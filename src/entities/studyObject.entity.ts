import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { StudyObjectsOfUser } from "./studyObjectsOfUser";
import { Resource } from "./resource.entity";
import { Event } from "./event.entity";
import { Tag } from "./tag.entity";

@Entity({ name: 'study_object' })
export class StudyObject {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.createdStudyObjects)
    author: User;

    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'description', nullable: true })
    description: string | null;

    @Column({ name: 'study_blocks_count' })
    studyBlocksCount: number;

    @Column({ name: 'is_public' })
    isPublic: boolean;

    @ManyToMany(() => Tag, (tag) => tag.studyObjects)
    tags: Tag[];

    @ManyToMany(() => StudyObjectsOfUser, (studyingUsers) => studyingUsers.objectId)
    studyingUsers: StudyObjectsOfUser[];

    @ManyToMany(() => Resource, (resource) => resource.studyObjects)
    resources: Resource[];

    @OneToMany(() => Event, (event) => event.studyObject)
    events: Event[]
}