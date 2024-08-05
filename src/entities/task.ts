import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'task' })
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'tasks', type: 'jsonb' })
    exercise: string;

    @Column({ name: 'is_done', type: 'bool' })
    isDone: boolean;

    @Column({ name: 'mistake_ids', type: 'jsonb' })
    mistakeIds: string;

    @ManyToOne(() => User, (user) => user.tasks)
    user: User;
}