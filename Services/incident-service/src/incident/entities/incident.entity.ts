import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';

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
  description: 'Nature de l’incident de trafic',
});

registerEnumType(IncidentStatus, {
  name: 'IncidentStatus',
  description: 'Statut courant de l’incident',
});

@ObjectType()
export class Incident {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  location: string;

  @Field(() => IncidentType)
  type: IncidentType;

  @Field(() => IncidentStatus)
  status: IncidentStatus;

  @Field()
  createdAt: Date;
}
