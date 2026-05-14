import { CreateIncidentInput } from './create-incident.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateIncidentInput extends PartialType(CreateIncidentInput) {
  @Field(() => Int)
  id: number;
}
