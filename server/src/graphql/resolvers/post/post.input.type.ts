import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PostEntity, CheckInEntity } from '@/entities';

@InputType('PostInputType')
export class PostInputType implements Omit<PostEntity, 'createdAt' | 'updatedAt'> {
  @IsNumber()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  public id?: number;

  @IsString()
  @Field(() => String)
  public email: string;

  @IsString()
  @Field(() => String)
  public content: string;

  @IsNumber()
  @Field(() => Float)
  public rating: number;

  @IsString()
  @Field(() => String)
  public storeName: string;

  @IsString()
  @Field(() => String)
  public categoryName: string;
}
