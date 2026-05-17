import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { User, UserRole } from '../entities/user.entity';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @IsNotEmpty()
  username!: string;

  @Field()
  @MinLength(6)
  password!: string;

  @Field(() => UserRole, { nullable: true })
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
  @IsNotEmpty()
  password!: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  @IsNotEmpty()
  id!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  username?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(6)
  password?: string;

  @Field(() => UserRole, { nullable: true })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

@ObjectType()
export class AuthPayload {
  @Field(() => User)
  user!: User;

  @Field()
  token!: string;
}
