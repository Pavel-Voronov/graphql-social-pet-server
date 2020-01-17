import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { AUTH_ROLES } from '../shared/constants';
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

  @Field(type => AUTH_ROLES)
  role: AUTH_ROLES;

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

registerEnumType(AUTH_ROLES, {
  name: 'AuthRole',
  description: 'User role'
});
