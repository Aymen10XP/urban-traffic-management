import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum CongestionLevel {
  FAIBLE = 'FAIBLE',
  MOYEN = 'MOYEN',
  ELEVE = 'ELEVE',
}

registerEnumType(CongestionLevel, {
  name: 'CongestionLevel',
  description: 'Traffic congestion level for the zone',
});

@ObjectType()
@Entity('traffic_zones')
export class TrafficZone {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field(() => Int, { description: 'Traffic density percentage between 0 and 100' })
  @Column()
  density!: number;

  @Field(() => CongestionLevel)
  @Column({
    type: 'enum',
    enum: CongestionLevel,
  })
  congestionLevel!: CongestionLevel;

  @Field()
  @Column()
  location!: string;

  @Field(() => Boolean)
  get isCongested(): boolean {
    return this.congestionLevel === CongestionLevel.ELEVE;
  }

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
