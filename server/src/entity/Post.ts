import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 50 })
  store_name: string;

  @Column("varchar", { length: 50 })
  category_name: string;

  @Column("varchar", { length: 50 })
  email: string;

  @Column("varchar", { length: 200 })
  content: string;

  @Column("decimal", { precision: 5, scale: 2 })
  rating: number;

  @Column("varchar", { length: 15 })
  created_at: string;

  static CountByName(name:string){
    return this.createQueryBuilder('post')
      .where('post.store_name = :name',{name})
      .getCount();
  }

  static SumByName(name:string){
    return this.createQueryBuilder('post')
    .select("SUM(post.rating)", "sum")
    .getRawOne();
  }
}
