import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Incident {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
