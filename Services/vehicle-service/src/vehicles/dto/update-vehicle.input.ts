import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';
import { CreateVehicleInput } from './create-vehicle.input';

@InputType()
export class UpdateVehicleInput extends PartialType(CreateVehicleInput) {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id!: number;
}
