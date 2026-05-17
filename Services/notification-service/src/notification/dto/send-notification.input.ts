import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { NotificationType } from '../entities/notification.entity';

@InputType()
export class SendNotificationInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  message!: string;

  @Field(() => NotificationType)
  @IsEnum(NotificationType)
  type!: NotificationType;
}
