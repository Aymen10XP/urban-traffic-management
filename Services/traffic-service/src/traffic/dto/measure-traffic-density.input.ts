import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, Max, Min } from 'class-validator';

@InputType()
export class MeasureTrafficDensityInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  zoneId!: number;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(100)
  density!: number;
}
