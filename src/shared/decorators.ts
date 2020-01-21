import { createParamDecorator, SetMetadata } from '@nestjs/common';
import { User } from '../generated/prisma-client';
import { IRole } from './types';

export const AuthUser = createParamDecorator(
  (data, [root, args, ctx, info]): User => ctx.req.user
);

export const Roles = (...roles: IRole[]) => SetMetadata('roles', roles);
