import { Strategy as JwtStrategyPassport, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategyPassport } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../generated/prisma-client';
import { JwtDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JWT_SECRET_KEY } from '../../shared/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtStrategyPassport, 'jwt') {
  public constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET_KEY
    });
  }

  public async validate(payload: JwtDto): Promise<User> {
    const user = await this.authService.validateUserById(payload.userId);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}

@Injectable()
export class LocalStrategy extends PassportStrategy(
  LocalStrategyPassport,
  'local'
) {
  public constructor(private readonly authService: AuthService) {
    super();
  }

  public async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUserByCredentials(
      username,
      password
    );
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
