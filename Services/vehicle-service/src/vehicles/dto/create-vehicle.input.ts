import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';
import { VehicleStatus } from '../entities/vehicle.entity';

@InputType()
export class CreateVehicleInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  licensePlate!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  make!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  model!: string;

  @Field(() => Int)
  @IsInt()
  @Min(1900)
  @Max(2100)
  year!: number;

  @Field(() => VehicleStatus, { nullable: true })
  @IsOptional()
  @IsEnum(VehicleStatus)
  status?: VehicleStatus;
}
