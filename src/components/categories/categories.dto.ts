import { Field, ArgsType, InputType } from 'type-graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@ArgsType()
export class CategoryArgs {
  @Field(type => String)
  @IsNotEmpty()
  id: string;
}

@InputType()
export class CreateCategoryInput {
  @Field(type => String)
  @IsNotEmpty()
  @MinLength(8)
  title: string;
}
