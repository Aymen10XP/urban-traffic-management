import { InputType, Field } from '@nestjs/graphql';
import { IncidentType } from '../entities/incident.entity';

@InputType()
export class CreateIncidentInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  location: string;

  @Field(() => IncidentType)
  type: IncidentType;
}
