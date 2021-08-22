import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class CheckIN extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 20 })
    store_name: string;

    @Column('varchar', { length: 50 })
    email: string;

    @Column('varchar', { length: 15 })
    created_at: string;
}
