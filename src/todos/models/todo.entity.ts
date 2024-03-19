import { Entity, Column, PrimaryColumn, } from "typeorm";

@Entity()
export class Todo {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: "todo" | "in-progress" | "done";

    @Column()
    boardId: string;
}