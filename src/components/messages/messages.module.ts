import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { MessagesResolver } from './messages.resolver';

@Module({
  imports: [PrismaModule],
  providers: [MessagesResolver]
})
export class MessagesModule {}
