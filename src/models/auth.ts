import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AuthModel {
  @Field(type => String, { description: 'JWT Bearer token' })
  authToken: string;
}
