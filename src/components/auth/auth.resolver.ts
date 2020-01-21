import { User } from '../../generated/prisma-client';
import { AuthModel, UserModel } from '../../models';
import {
  Resolver,
  Mutation,
  Args,
  ResolveProperty,
  Parent
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput, SignInInput } from './auth.dto';

@Resolver(AuthModel)
export class AuthResolver {
  public constructor(private readonly auth: AuthService) {}

  @Mutation(returns => AuthModel)
  public async signUp(@Args('data') data: SignUpInput): Promise<AuthModel> {
    data.email = data.email.toLowerCase();
    const accessToken = await this.auth.createUser(data);
    return { accessToken };
  }

  @Mutation(returns => AuthModel)
  public async signIn(@Args('data') { email, password }: SignInInput): Promise<
    AuthModel
  > {
    const accessToken = await this.auth.login(email.toLowerCase(), password);
    return { accessToken };
  }

  @ResolveProperty(returns => UserModel)
  public async user(@Parent() { accessToken }: AuthModel): Promise<User> {
    return this.auth.getUserFromAccessToken(accessToken);
  }
}
