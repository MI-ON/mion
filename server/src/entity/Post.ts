import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar',{length:20})
  store_id: string;

  @Column('varchar',{length:50})
  email: string;

  @Column('varchar',{length:200})
  content: string;

  @Column("decimal", { precision: 5, scale: 2 })
  rating: number;

  @Column()
  created_at: Date;
}
