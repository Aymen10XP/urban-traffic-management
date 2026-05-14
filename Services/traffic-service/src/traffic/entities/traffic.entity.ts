import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Traffic {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
