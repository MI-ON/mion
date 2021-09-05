import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import StandardBaseEntity from './standard-base.entity';

@Entity({ name: 'user' })
export class UserEntity extends StandardBaseEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @PrimaryColumn({ type: 'varchar', length: 100 })
  public email: string;

  @Column({ type: 'varchar', length: 50 })
  public fullName: string;

  @Column({ type: 'varchar', length: 500 })
  public avatarUrl?: string;
}
