import { CreateTrafficInput } from './create-traffic.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTrafficInput extends PartialType(CreateTrafficInput) {
  @Field(() => Int)
  id: number;
}
