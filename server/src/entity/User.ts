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

  @PrimaryColumn("varchar", { length: 50 })
  email: string;

  @Column("varchar", { length: 10, nullable: true })
  full_name: string;

  @Column("varchar", { length: 500, nullable: true })
  image_url: string;
}
