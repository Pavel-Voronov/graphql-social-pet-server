import { Field, ObjectType } from 'type-graphql';
import { UserModel, RoomModel } from './';

@ObjectType()
export class MessageModel {
  @Field(type => String)
  id: string;

  @Field(type => String)
  text: string;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => RoomModel)
  room: RoomModel;

  @Field(type => UserModel)
  author: UserModel;
}
