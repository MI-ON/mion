import { Entity,PrimaryColumn,PrimaryGeneratedColumn,Column,CreateDateColumn, BaseEntity } from "typeorm";

@Entity()
export class CheckIN extends BaseEntity{

    @PrimaryGeneratedColumn()
    idx: number;

    @Column({
        length:20
    })
    store_id: string;

    @Column()
    user_email: string;

    @CreateDateColumn()
    created_at: Date;
}