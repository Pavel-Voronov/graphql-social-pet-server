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
import { Room, Category } from '../../generated/prisma-client';
import { CategoryModel, RoomModel } from '../../models';
import { GqlAuthGuard, GqlAuthRolesGuard } from '../../shared/guards';
import { CategoryArgs, CreateCategoryInput } from './categories.dto';
import { AuthRoles } from '../../shared/decorators';
import { AUTH_ROLES } from '../../shared/constants';

@Resolver(CategoryModel)
export class CategoriesResolver {
  public constructor(private readonly prisma: PrismaService) {}

  @Query(returns => [CategoryModel])
  public async categories(): Promise<Category[]> {
    return this.prisma.client.categories();
  }

  @Query(returns => CategoryModel)
  public async category(@Args() { id }: CategoryArgs): Promise<Category> {
    return this.prisma.client.category({ id });
  }

  @AuthRoles(AUTH_ROLES.ADMIN)
  @UseGuards(GqlAuthGuard, GqlAuthRolesGuard)
  @Mutation(returns => CategoryModel)
  public async createCategory(
    @Args('data') data: CreateCategoryInput
  ): Promise<Category> {
    return this.prisma.client.createCategory(data);
  }

  @ResolveProperty(returns => [RoomModel])
  public async rooms(@Parent() { id }: Category): Promise<Room[]> {
    return this.prisma.client.category({ id }).rooms();
  }
}
