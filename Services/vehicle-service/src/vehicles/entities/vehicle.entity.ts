import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';

export enum VehicleStatus {
  ACTIVE = 'ACTIVE',
  IN_MAINTENANCE = 'IN_MAINTENANCE',
  OUT_OF_SERVICE = 'OUT_OF_SERVICE',
}

registerEnumType(VehicleStatus, {
  name: 'VehicleStatus',
  description: 'Statut du véhicule',
});

@ObjectType()
export class Vehicle {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  licensePlate?: string;

  @Field({ nullable: true })
  make?: string;

  @Field({ nullable: true })
  model?: string;

  @Field(() => Int, { nullable: true })
  year?: number;

  @Field(() => VehicleStatus, { nullable: true })
  status?: VehicleStatus;
}
