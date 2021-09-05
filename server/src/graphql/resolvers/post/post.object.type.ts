import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { PostEntity } from '@/entities';

@ObjectType('PostObjectType')
export class PostObjectType implements Omit<PostEntity, 'createdAt' | 'updatedAt'> {
  @Field(() => Int)
  public id?: number;

  @Field(() => String)
  public email: string;

  @Field(() => String)
  public content: string;

  @Field(() => Float)
  public rating: number;

  @Field(() => String)
  public storeName: string;

  @Field(() => String)
  public categoryName: string;
}

@ObjectType('SubInfoObjectType')
export class SubInfoObjectType {
  @Field(() => Int)
  public count: number;

  @Field(() => Int)
  public sum: number;
}
