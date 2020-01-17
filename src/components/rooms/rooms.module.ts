import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { RoomsResolver } from './rooms.resolver';

@Module({
  imports: [PrismaModule],
  providers: [RoomsResolver]
})
export class RoomsModule {}
