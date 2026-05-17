import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

@InputType()
export class CreateTrafficZoneInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(100)
  density!: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  location!: string;
}
