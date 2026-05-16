import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateTrafficZoneInput {
  @Field()
  name: string;

  @Field(() => Int)
  density: number;

  @Field()
  location: string;
}
