import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GqlAuthGuard, GqlAuthRolesGuard } from '../../shared/guards';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './auth.strategies';
import { JWT_SECRET_KEY, JWT_EXPIRES_IN } from '../../shared/constants';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: JWT_EXPIRES_IN }
    }),
    PrismaModule
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    GqlAuthGuard,
    GqlAuthRolesGuard
  ],
  exports: [GqlAuthGuard, GqlAuthRolesGuard]
})
export class AuthModule {}
