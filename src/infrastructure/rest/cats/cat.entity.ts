import { Column, Entity, IsNull, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "cats" })
export class Cat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: "100", nullable: false })
    name: string;

    @Column({ type: "varchar", length: "50", nullable: true })
    breed: string;

    @Column({ type: "boolean", default: true })
    isActive: boolean;
}
