import { createParamDecorator, SetMetadata } from '@nestjs/common';
import { User } from '../generated/prisma-client';
import { IAuthRole } from './types';

export const AuthUser = createParamDecorator(
  (data, [root, args, ctx, info]): User => ctx.req.user
);

export const AuthRoles = (...roles: IAuthRole[]) => SetMetadata('roles', roles);
