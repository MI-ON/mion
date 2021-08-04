import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class Post extends BaseEntity{

    @PrimaryGeneratedColumn()
    idx: number;

    @Column()
    store_id:string;

    @Column()
    user_email:string;

    @Column()
    content:string;

    @Column("decimal", { precision: 5, scale: 2 })
    rating:number;

}