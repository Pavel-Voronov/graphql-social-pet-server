import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class SignUpInput {
  @Field(type => String)
  @IsEmail()
  email: string;

  @Field(type => String)
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Field(type => String)
  @IsNotEmpty()
  firstName: string;

  @Field(type => String)
  @IsNotEmpty()
  lastName: string;
}

@InputType()
export class SignInInput {
  @Field(type => String)
  @IsEmail()
  email: string;

  @Field(type => String)
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export interface JwtDto {
  userId: string;
}
