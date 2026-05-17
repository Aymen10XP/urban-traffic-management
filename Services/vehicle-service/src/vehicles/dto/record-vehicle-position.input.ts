import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNumber, Max, Min } from 'class-validator';

@InputType()
export class RecordVehiclePositionInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  vehicleId!: number;

  @Field(() => Float)
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude!: number;

  @Field(() => Float)
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude!: number;
}
