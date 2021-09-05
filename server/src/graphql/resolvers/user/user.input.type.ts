import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { UserEntity } from '@/entities';

@InputType('UserInputType')
export class UserInputType implements Omit<UserEntity, 'createdAt' | 'updatedAt'> {
  @IsNumber()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  public id?: number;

  @IsString()
  @Field(() => String)
  public email: string;

  @IsString()
  @Field(() => String)
  public fullName: string;

  @IsString()
  @Field(() => String)
  public avatarUrl?: string;
}
