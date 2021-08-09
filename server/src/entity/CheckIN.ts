import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
} from "typeorm";

@Entity()
export class CheckIN extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar',{length:20})
  store_id: string;

  @Column('varchar',{length:50})
  email: string;

  @CreateDateColumn()
  created_at: Date;
}
