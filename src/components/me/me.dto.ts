import { Field, InputType } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateMeInput {
  @Field(type => String, { nullable: true })
  @IsNotEmpty()
  firstName?: string;

  @Field(type => String, { nullable: true })
  @IsNotEmpty()
  lastName?: string;
}

@InputType()
export class JoinRoomInput {
  @Field(type => String)
  @IsNotEmpty()
  roomId: string;
}

@InputType()
export class LeaveRoomInput {
  @Field(type => String)
  @IsNotEmpty()
  roomId: string;
}
