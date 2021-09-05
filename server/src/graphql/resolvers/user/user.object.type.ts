import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '@/entities';

@ObjectType('UserObjectType')
export class UserObjectType implements Omit<UserEntity, 'createdAt' | 'updatedAt'> {
  @Field(() => Int)
  public id?: number;

  @Field(() => String)
  public email: string;

  @Field(() => String)
  public fullName: string;

  @Field(() => String)
  public avatarUrl?: string;
}
