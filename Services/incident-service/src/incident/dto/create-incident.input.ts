import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IncidentType } from '../entities/incident.entity';

@InputType()
export class CreateIncidentInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  location!: string;

  @Field(() => IncidentType)
  @IsEnum(IncidentType)
  type!: IncidentType;
}
