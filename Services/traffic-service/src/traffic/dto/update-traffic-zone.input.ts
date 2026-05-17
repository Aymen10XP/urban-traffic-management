import { InputType, PartialType } from '@nestjs/graphql';
import { CreateTrafficZoneInput } from './create-traffic-zone.input';

@InputType()
export class UpdateTrafficZoneInput extends PartialType(CreateTrafficZoneInput) {}
