import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CategoriesResolver } from './categories.resolver';

@Module({
  imports: [PrismaModule],
  providers: [CategoriesResolver]
})
export class CategoriesModule {}
