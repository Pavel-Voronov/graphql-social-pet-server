import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { ROLES } from '../shared/constants';
import { RoomModel, MessageModel } from './';

@ObjectType()
export class UserModel {
  @Field(type => String)
  id: string;

  @Field(type => String)
  email: string;

  @Field(type => String)
  firstName: string;

  @Field(type => String)
  lastName: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(type => ROLES)
  role: ROLES;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => [RoomModel])
  rooms: RoomModel[];

  @Field(type => [MessageModel])
  messages: MessageModel[];

  @Field(type => [UserModel])
  friends: UserModel[];

  password: string;
}

registerEnumType(ROLES, {
  name: 'Role',
  description: 'User role'
});
