import { InputType, Field } from '@nestjs/graphql';
import { NotificationType } from '../entities/notification.entity';

@InputType()
export class SendNotificationInput {
  @Field()
  message: string;

  @Field(() => NotificationType)
  type: NotificationType;
}
