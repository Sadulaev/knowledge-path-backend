import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Resource } from "./resource.entity";
import { StudyObject } from "./studyObject.entity";

@Entity({ name: 'tag' })
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name' })
    name: string;

    @ManyToMany(() => Resource, (resource) => resource.tags)
    resources: Resource[];

    @ManyToMany(() => StudyObject, (object) => object.tags)
    studyObjects: Resource[];
}