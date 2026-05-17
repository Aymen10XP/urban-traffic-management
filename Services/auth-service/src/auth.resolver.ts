import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { User, UserRole } from './entities/user.entity';
import { RegisterInput, LoginInput, AuthPayload, UpdateUserInput } from './dto/auth.input';
import { UseGuards, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async register(@Args('input') input: RegisterInput): Promise<AuthPayload> {
    return this.authService.register(input);
  }

  @Mutation(() => AuthPayload)
  async login(@Args('input') input: LoginInput): Promise<AuthPayload> {
    return this.authService.login(input);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async me(@Context() context: { req: AuthenticatedRequest }): Promise<User> {
    const userId = context.req.user?.userId;
    if (!userId) {
      throw new UnauthorizedException('User not found in request context');
    }

    const user = await this.authService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('Authenticated user not found');
    }

    return user;
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async users(): Promise<User[]> {
    return this.authService.getAllUsers();
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateUser(@Args('input') input: UpdateUserInput): Promise<User> {
    return this.authService.updateUser(input);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async removeUser(@Args('id') id: string): Promise<boolean> {
    return this.authService.removeUser(id);
  }
}
