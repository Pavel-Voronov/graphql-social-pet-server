import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { MeResolver } from './me.resolver';

@Module({
  imports: [PrismaModule],
  providers: [MeResolver]
})
export class MeModule {}
