import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateIncidentInput } from './create-incident.input';
import { IncidentStatus } from '../entities/incident.entity';

@InputType()
export class UpdateIncidentInput extends PartialType(CreateIncidentInput) {
  @Field(() => ID)
  id: string;

  @Field(() => IncidentStatus, { nullable: true })
  status?: IncidentStatus;
}
