import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import StandardBaseEntity from './standard-base.entity';

@Entity({ name: 'post' })
export class PostEntity extends StandardBaseEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @PrimaryColumn({ type: 'varchar', length: 100, nullable: false })
  public email: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  public content: string;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: false,
  })
  public rating: number;

  @Column({ type: 'varchar', length: 50 })
  public storeName: string;

  @Column({ type: 'varchar', length: 50 })
  public categoryName: string;
}
