import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryColumn()
    user_email: string;

    @Column({
        length:10,
        nullable:true
    })
    nickname: string;

    @Column("blob", { nullable: true })
    content: Blob;

}
//string: varchar(255)
//default: nullable:false