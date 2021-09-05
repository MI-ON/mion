import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CheckInEntity } from '@/entities';

@InputType('StoreInputType')
export class StoreInputType implements Omit<CheckInEntity, 'createdAt' | 'updatedAt'> {
  @IsNumber()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  public id?: number;

  @IsString()
  @Field(() => String)
  public email: string;

  @IsString()
  @Field(() => String)
  public storeName: string;

  @Field(() => Date)
  public checkedInAt: Date;
}
