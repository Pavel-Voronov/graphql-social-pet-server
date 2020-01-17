import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './components/auth/auth.module';
import { CategoriesModule } from './components/categories/categories.module';
import { MeModule } from './components/me/me.module';
import { MessagesModule } from './components/messages/messages.module';
import { RoomsModule } from './components/rooms/rooms.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: './src/schema.graphql',
      debug: true,
      playground: true,
      context: ({ req }) => ({ req })
    }),
    PrismaModule,
    AuthModule,
    CategoriesModule,
    MeModule,
    MessagesModule,
    RoomsModule
  ],
  controllers: [AppController]
})
export class AppModule {}
