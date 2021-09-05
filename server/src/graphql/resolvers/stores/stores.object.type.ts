import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CheckInEntity } from '@/entities';

@ObjectType('StoreObjectType')
export class StoreObjectType {
  @Field(() => Int) public id: number;
  @Field(() => String) public x: string;
  @Field(() => String) public y: string;
  @Field(() => String) public addressName: string;
  @Field(() => String) public categoryGroupCode: string;
  @Field(() => String) public categoryGroupName: string;
  @Field(() => String) public categoryName: string;
  @Field(() => String) public distance: string;
  @Field(() => String) public phone: string;
  @Field(() => String) public placeName: string;
  @Field(() => String) public placeUrl: string;
  @Field(() => String) public roadAddressName: string;
}

@ObjectType('CheckInObjectType')
export class CheckInObjectType implements Omit<CheckInEntity, 'createdAt' | 'updatedAt'> {
  @Field(() => Int)
  public id?: number;

  @Field(() => String)
  public email: string;

  @Field(() => String)
  public storeName: string;

  @Field(() => Date)
  public checkedInAt: Date;
}
