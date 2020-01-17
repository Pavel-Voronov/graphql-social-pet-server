import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../generated/prisma-client';
import { SignUpInput } from './auth.dto';
import { Helpers } from '../../shared/helpers';

@Injectable()
export class AuthService {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  private generateAuthToken(user: User): string {
    return this.jwtService.sign({ userId: user.id });
  }

  public async createUser(payload: SignUpInput): Promise<string> {
    const hashedPassword = await Helpers.hashPassword(payload.password);

    const user = await this.prisma.client.createUser({
      ...payload,
      password: hashedPassword
    });

    return this.generateAuthToken(user);
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await this.validateUserByCredentials(email, password);

    return this.generateAuthToken(user);
  }

  public async validateUserByCredentials(
    email: string,
    password: string
  ): Promise<User> {
    const user = await this.prisma.client.user({ email });
    if (!user) throw new NotFoundException(`No user found for email: ${email}`);

    const passwordValid = await Helpers.validatePassword(
      password,
      user.password
    );

    if (!passwordValid)
      throw new BadRequestException('given email and password do not match');

    return user;
  }

  public async validateUserById(id: string): Promise<User> {
    return this.prisma.client.user({ id });
  }

  public async getUserFromToken(token: string): Promise<User> {
    const id = this.jwtService.decode(token)['userId'];
    return this.prisma.client.user({ id });
  }
}
