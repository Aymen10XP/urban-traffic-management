import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';
import { IncidentStatus } from '../entities/incident.entity';
import { CreateIncidentInput } from './create-incident.input';

@InputType()
export class UpdateIncidentInput extends PartialType(CreateIncidentInput) {
  @Field(() => IncidentStatus, { nullable: true })
  @IsOptional()
  @IsEnum(IncidentStatus)
  status?: IncidentStatus;
}
