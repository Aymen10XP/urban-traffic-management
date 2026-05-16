import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';

export enum NotificationType {
  INFO = 'INFO',
  ALERTE = 'ALERTE',
  URGENCE = 'URGENCE',
}

registerEnumType(NotificationType, {
  name: 'NotificationType',
  description: 'Type de notification',
});

@ObjectType()
export class Notification {
  @Field(() => Int)
  id: number;

  @Field()
  message: string;

  @Field(() => NotificationType)
  type: NotificationType;

  @Field(() => Boolean)
  isRead: boolean;

  @Field()
  createdAt: Date;
}
