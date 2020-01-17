import { Field, ObjectType } from 'type-graphql';
import { CategoryModel, UserModel, MessageModel } from './';

@ObjectType()
export class RoomModel {
  @Field(type => String)
  id: string;

  @Field(type => String)
  title: string;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => CategoryModel)
  category: CategoryModel;

  @Field(type => [MessageModel])
  messages: MessageModel[];

  @Field(type => [UserModel])
  users: UserModel[];
}
