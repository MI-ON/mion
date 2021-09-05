import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import StandardBaseEntity from './standard-base.entity';

@Entity({ name: 'check_in' })
export class CheckInEntity extends StandardBaseEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ type: 'varchar', length: 50 })
  public storeName: string;

  @Column({ type: 'varchar', length: 100 })
  public email: string;

  @Column({ type: 'date' })
  public checkedInAt: Date;
}
