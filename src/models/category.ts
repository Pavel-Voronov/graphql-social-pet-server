import { Field, ObjectType } from 'type-graphql';
import { RoomModel } from './';

@ObjectType()
export class CategoryModel {
  @Field(type => String)
  id: string;

  @Field(type => String)
  title: string;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => [RoomModel])
  rooms: RoomModel[];
}
