import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VehiclePosition } from './vehicle-position.entity';

export enum VehicleStatus {
  ACTIVE = 'ACTIVE',
  IN_MAINTENANCE = 'IN_MAINTENANCE',
  OUT_OF_SERVICE = 'OUT_OF_SERVICE',
}

registerEnumType(VehicleStatus, {
  name: 'VehicleStatus',
  description: 'Current operating status of the vehicle',
});

@ObjectType()
@Entity('vehicles')
export class Vehicle {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  licensePlate!: string;

  @Field()
  @Column()
  make!: string;

  @Field()
  @Column()
  model!: string;

  @Field(() => Int)
  @Column()
  year!: number;

  @Field(() => VehicleStatus)
  @Column({
    type: 'enum',
    enum: VehicleStatus,
    default: VehicleStatus.ACTIVE,
  })
  status!: VehicleStatus;

  @Field(() => [VehiclePosition])
  @OneToMany(() => VehiclePosition, (position) => position.vehicle)
  positionHistory!: VehiclePosition[];
}
