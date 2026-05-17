import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum IncidentType {
  ACCIDENT = 'ACCIDENT',
  TRAVAUX = 'TRAVAUX',
  ROUTE_FERMEE = 'ROUTE_FERMEE',
  EMBOUTEILLAGE = 'EMBOUTEILLAGE',
}

export enum IncidentStatus {
  SIGNALE = 'SIGNALE',
  EN_COURS = 'EN_COURS',
  RESOLU = 'RESOLU',
}

registerEnumType(IncidentType, {
  name: 'IncidentType',
  description: 'Type of traffic incident',
});

registerEnumType(IncidentStatus, {
  name: 'IncidentStatus',
  description: 'Current incident status',
});

@ObjectType()
@Entity('incidents')
export class Incident {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column('text')
  description!: string;

  @Field()
  @Column()
  location!: string;

  @Field(() => IncidentType)
  @Column({
    type: 'enum',
    enum: IncidentType,
  })
  type!: IncidentType;

  @Field(() => IncidentStatus)
  @Column({
    type: 'enum',
    enum: IncidentStatus,
    default: IncidentStatus.SIGNALE,
  })
  status!: IncidentStatus;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
