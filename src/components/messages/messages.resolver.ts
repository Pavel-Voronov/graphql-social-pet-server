import { Resolver, ResolveProperty, Parent } from '@nestjs/graphql';
import { PrismaService } from '../../prisma/prisma.service';
import { Room, User, Message } from '../../generated/prisma-client';
import { MessageModel, RoomModel, UserModel } from '../../models';

@Resolver(MessageModel)
export class MessagesResolver {
  public constructor(private readonly prisma: PrismaService) {}

  @ResolveProperty(returns => RoomModel)
  public async room(@Parent() { id }: Message): Promise<Room> {
    return this.prisma.client.message({ id }).room();
  }

  @ResolveProperty('author', returns => UserModel)
  public async author(@Parent() { id }: Message): Promise<User> {
    return this.prisma.client.message({ id }).author();
  }
}
