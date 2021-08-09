import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  email: string;

  @Column()
  full_name: string;

  @Column()
  image_url: string;
}
