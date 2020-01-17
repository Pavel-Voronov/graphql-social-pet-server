import {
  Resolver,
  Query,
  ResolveProperty,
  Parent,
  Args
} from '@nestjs/graphql';
import { PrismaService } from '../../prisma/prisma.service';
import { Room, User, Message, Category } from '../../generated/prisma-client';
import { RoomArgs } from './rooms.dto';
import {
  RoomModel,
  CategoryModel,
  UserModel,
  MessageModel
} from '../../models';

@Resolver(RoomModel)
export class RoomsResolver {
  public constructor(private readonly prisma: PrismaService) {}

  @Query(returns => [RoomModel])
  public async room(@Args() { id }: RoomArgs): Promise<Room> {
    return this.prisma.client.room({ id });
  }

  @ResolveProperty(returns => CategoryModel)
  public async category(@Parent() { id }: Room): Promise<Category> {
    return this.prisma.client.room({ id }).category();
  }

  @ResolveProperty(returns => [UserModel])
  public async users(@Parent() { id }: Room): Promise<User[]> {
    return this.prisma.client.room({ id }).users();
  }

  @ResolveProperty(returns => [MessageModel])
  public async messages(@Parent() { id }: Room): Promise<Message[]> {
    return this.prisma.client.room({ id }).messages();
  }
}
