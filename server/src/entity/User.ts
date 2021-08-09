import {Entity, PrimaryColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class User extends BaseEntity{

    @PrimaryColumn('varchar', { length: 250 })
    user_email: string;

    @Column({
        length:10,
        nullable:true
    })
    nickname: string;

    @Column('blob', { nullable: true })
    image: string | null;

    static saveUser(user: User){
        return
    }

}
