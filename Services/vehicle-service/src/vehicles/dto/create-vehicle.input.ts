import { InputType, Int, Field } from '@nestjs/graphql';
import { VehicleStatus } from '../entities/vehicle.entity';

@InputType()
export class CreateVehicleInput {
  @Field()
  licensePlate: string;

  @Field()
  make: string;

  @Field()
  model: string;

  @Field(() => Int)
  year: number;

  @Field(() => VehicleStatus, { nullable: true })
  status?: VehicleStatus;
}
