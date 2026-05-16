import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';

export enum CongestionLevel {
  FAIBLE = 'Faible',
  MOYEN = 'Moyen',
  ELEVE = 'Élevé',
}

registerEnumType(CongestionLevel, {
  name: 'CongestionLevel',
  description: 'Niveau de congestion de la zone de trafic',
});

@ObjectType()
export class TrafficZone {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int, { description: 'Densité du trafic en pourcentage (0-100)' })
  density: number;

  @Field(() => CongestionLevel)
  congestionLevel: CongestionLevel;

  @Field()
  location: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
