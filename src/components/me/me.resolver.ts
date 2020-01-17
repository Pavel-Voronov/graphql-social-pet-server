import {
  Resolver,
  Query,
  Mutation,
  ResolveProperty,
  Parent,
  Args
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User, Room, Message } from '../../generated/prisma-client';
import { GqlAuthGuard } from '../../shared/guards';
import { AuthUser } from '../../shared/decorators';
import { UserModel, MessageModel, RoomModel } from '../../models';
import { UpdateMeInput, JoinRoomInput, LeaveRoomInput } from './me.dto';

@Resolver(UserModel)
@UseGuards(GqlAuthGuard)
export class MeResolver {
  public constructor(private readonly prisma: PrismaService) {}

  @Query(returns => UserModel)
  public async me(@AuthUser() { id }: User): Promise<User> {
    return this.prisma.client.user({ id });
  }

  @Mutation(returns => UserModel)
  public async updateMe(
    @Args('data') data: UpdateMeInput,
    @AuthUser() { id }: User
  ): Promise<User> {
    return this.prisma.client.updateUser({ where: { id }, data });
  }

  @Mutation(returns => UserModel)
  public async joinRoom(
    @Args('data') { roomId }: JoinRoomInput,
    @AuthUser() { id }: User
  ): Promise<User> {
    return this.prisma.client.updateUser({
      where: { id },
      data: { rooms: { connect: { id: roomId } } }
    });
  }

  @Mutation(returns => UserModel)
  public async leaveRoom(
    @Args('data') { roomId }: LeaveRoomInput,
    @AuthUser() { id }: User
  ): Promise<User> {
    return this.prisma.client.updateUser({
      where: { id },
      data: { rooms: { disconnect: { id: roomId } } }
    });
  }

  @ResolveProperty(returns => [RoomModel])
  public async rooms(@Parent() { id }: User): Promise<Room[]> {
    return this.prisma.client.user({ id }).rooms();
  }

  @ResolveProperty(returns => [UserModel])
  public async friends(@Parent() { id }: User): Promise<User[]> {
    return this.prisma.client.user({ id }).friends();
  }

  @ResolveProperty(returns => [MessageModel])
  public async messages(@Parent() { id }: User): Promise<Message[]> {
    return this.prisma.client.user({ id }).messages();
  }
}
