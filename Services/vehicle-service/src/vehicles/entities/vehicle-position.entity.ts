import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@ObjectType()
@Entity('vehicle_positions')
export class VehiclePosition {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Float)
  @Column('double precision')
  latitude!: number;

  @Field(() => Float)
  @Column('double precision')
  longitude!: number;

  @Field(() => Int)
  @Column()
  vehicleId!: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.positionHistory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vehicleId' })
  vehicle!: Vehicle;

  @Field()
  @CreateDateColumn()
  recordedAt!: Date;
}
