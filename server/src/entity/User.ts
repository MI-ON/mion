import { Blob } from "buffer";
import {Entity, PrimaryColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class User extends BaseEntity{

    @PrimaryColumn()
    user_email: string;

    @Column({
        length:10,
        nullable:true
    })
    nickname: string;

    @Column('blob',{ nullable: true })
    image: Blob;

    static saveUser(user: User){
        return
    }

}
