import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, MinLength, IsOptional, IsEnum } from 'class-validator';
import { User, UserRole } from '../entities/user.entity';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  email: string | undefined;

  @Field()
  username: string | undefined;

  @Field()
    @MinLength(6)
    password!: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

@InputType()
export class LoginInput {
  @Field()
    @IsEmail()
    email!: string;

  @Field()
    password!: string;
}

@ObjectType()
export class AuthPayload {
  @Field(() => User)
    user!: User;

  @Field()
    token!: string;
}