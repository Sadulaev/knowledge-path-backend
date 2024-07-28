import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', nullable: true })
    name: string;

    @Column({ name: 'user_type', default: 'free' })
    type: 'logged' | 'free';

    @Column({ name: 'is_first_entrance', default: true })
    isFirstEntrance: boolean;
}