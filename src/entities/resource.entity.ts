import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudyObject } from "./studyObject.entity";

@Entity({ name: 'resource' })
export class Resource {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'description' })
    description: string;

    @Column({ name: 'author' })
    author: string;

    @Column({ name: 'type' })
    type: string;

    @Column({ name: 'blocks_count' })
    blocksCount: number;

    @ManyToMany(() => StudyObject, (object) => object.resources)
    studyObjects: StudyObject[];
}